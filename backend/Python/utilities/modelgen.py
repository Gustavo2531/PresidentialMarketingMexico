import nltk
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.externals import joblib

from nltk.tokenize import word_tokenize
from nltk.stem import SnowballStemmer
from nltk.corpus import stopwords
from string import punctuation

from os.path import join
from os.path import isfile
from os import path

class Sentiment_Model_Generator(object):
    """
    Class to generate our sentiment model analyzer. SKLearn documentation for Linear SVC can be found here http://scikit-learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html

    Justification of LinearSVC can be found in the Class methods
    """
    def __init__(self):
        """
        Init needs to set up punctuation words that are part of spanish, and also stopwords. The stemmer is going to use this values to stem (https://en.wikipedia.org/wiki/Stemming) all tweets
        """
        # Uncomment only if nltk asks for something to install
        #nltk.download()
        #nltk.download("stopwords")
        self.es_stopwords = stopwords.words("spanish") # sacar articulos en ese idioma
        self.punctuation_words = list(punctuation)
        self.punctuation_words.extend(['¿', '¡'])
        self.punctuation_words.extend(map(str, range(10)))
        self.stemmer = SnowballStemmer('spanish')

    def stem_text(self, textList):
        """
        Receives a list of tokens
        After that it uses the snowball stemer to generate the stems list -> ['caz', 'caz', 'caz']

        :param textList: i.e if we input 'Caza Cazar Cazando' this function should receive the following list -> ['Caza', 'Cazar', 'Cazando']
        :return: returns a list of stemmed tokens  -> ['caz', 'caz', 'caz']
        """
        stemmed = []
        for text in textList:
            stemmed.append(self.stemmer.stem(text))

        return stemmed

    def stem_tweet(self, tweet):
        """
        Actual utility function that makes use of stem_text method in this class.

        Returns a list of stemmed tokens -> ['caz', 'caz', 'caz']

        :param tweet: This is an actual sentece, i.e: "Hola como estas?"
        :return: returns a list of stemmed tokens -> [1,0,2,3]
        """
        # Removes punctuation
        tweet = ''.join([char for char in tweet if char not in self.punctuation_words])
        # Get tokens
        tokens = word_tokenize(tweet)
        #print(tokens)

        try:
            stemmed_tokens = self.stem_text(tokens)
        except Exception as exception:
            print(exception)
            stemmed_tokens = ['']

        return stemmed_tokens

    def find_best_params(self, data_frame):
        """
        Utility function that tries to find the best parameters to use, the parameters are defined inside the parameters dictionary.
        It searches for all combinations and returns the one whose combinations yielded the best results.

        :param data_frame:
        :return: Returns nothing, but prints best hyperparameters
        """
        print("Finding best Hyperparameters")
        vectorizer = CountVectorizer(analyzer = 'word', tokenizer = self.stem_tweet,
                                     lowercase = True, stop_words = self.es_stopwords)
        pipeline = Pipeline([
            ('vect', vectorizer),
            ('cls', LinearSVC())
        ])

        parameters = {
            'vect__max_df': (0.5, 1.9),
            'vect__min_df': (10, 20, 50),
            'vect__max_features': (500, 1000),
            'vect__ngram_range': ((1, 1), (1, 2)),
            'cls__C': (0.2, 0.5, 0.7),
            'cls__loss': ('hinge', 'squared_hinge'),
            'cls__max_iter': (500, 1000)
        }

        grid_search = GridSearchCV(pipeline, parameters, n_jobs = -1, scoring = 'roc_auc', verbose=10)
        grid_search.fit(data_frame.text, data_frame.sentiment_polarity)
        print(grid_search.best_params_)

    def generate_model(self, data_frame):
        """
        Generates the Linear Support Vector Machine by training it using the complete merged dataframe that comes from TASS Utilities class.
        The hyperparameters come from the find_best_params function, inside this class.

        Model predictions come as 1 for a positive score and 0 for a negative one.

        :param data_frame: Merged data_frame of all train labeled tweets
        :return: returns the LinearSVC trained model.
        """
        # 1 is positive, 0 is negative

        file_path = path.dirname(path.realpath(__file__))
        models_path = path.join(file_path, "..", "..", "..", "models")
        model_url = join(models_path,"sentimentPredictionModel.pkl")

        if(not isfile(model_url)):
            print("Model not found, training it .....")
            vectorizer = CountVectorizer(analyzer='word', tokenizer=self.stem_tweet,
                                         lowercase=True, stop_words=self.es_stopwords,
                                         min_df=50, max_df=1.9,
                                         ngram_range=(1, 1), max_features=1000)

            linear_svc = LinearSVC(C = 0.2, loss = "squared_hinge",
                                   max_iter = 500, multi_class = "ovr",
                                   random_state = None, penalty = 'l2',
                                   tol=0.0001)

            pipeline = Pipeline([
                ('vect', vectorizer),
                ('cls', linear_svc)
            ])

            model = pipeline.fit(data_frame.text, data_frame.sentiment_polarity)
            joblib.dump(model, model_url)

        else:
            print("Model located, loading it ....")
            model = joblib.load(model_url)

        return model



