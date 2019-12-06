from utilities.modelgen import Sentiment_Model_Generator
from utilities.tassutilities import Tass_Utils
from utilities.twitterparser import Twitter_Parser

def generate_lsvm_model():

    tass_utils = Tass_Utils()
    model_gen = Sentiment_Model_Generator()
    # We find the best hyper params by doing a Grid Search, uncomment if you want to execute grid search
    # model_gen.find_best_params(tass_utils.completeCorpus)

    model = model_gen.generate_model(tass_utils.completeCorpus)

    # Evaluate our tweets
    parser = Twitter_Parser()
    tweets = parser.generate_tweet_csv()
    tweets['evaluation'] = model.predict(tweets.text)
    print(tweets)
    # print(tweets.get_value(983, 'text'))
