from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from nltk.corpus import stopwords
from string import punctuation
from sklearn.decomposition import NMF, LatentDirichletAllocation
import pandas as pd
from os import path
import re

file_path = path.dirname(path.realpath(__file__))
datasets_path = path.join(file_path, "..", "..", "datasets", "debatePresidencial2018")
es_stopwords = stopwords.words("spanish")
es_stopwords.extend(["debateine", "debatedeldebate", "debatepresidencial2018", "co", "https", "debatepresidencial", "elecciones2018"])
features = 1000
punctuation_words = list(punctuation)
punctuation_words.extend(['¿', '¡'])

def load_csv(filename):
    data_frame = pd.read_csv(path.join(datasets_path, filename))
    data_frame['text'] = data_frame['text'].str.replace(r'^https?:\/\/.*[\r\n]*', '')
    #data_frame['text'] = [word for word in data_frame['text'] if word not in es_stopwords]

    documents = data_frame['text'].values.tolist()

    # NMF
    tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=features, stop_words= es_stopwords)
    tfidf = tfidf_vectorizer.fit_transform(documents)
    tfidf_feature_names = tfidf_vectorizer.get_feature_names()

    # LDA
    tf_vectorizer = CountVectorizer(max_df=0.95, min_df=2, max_features=features, stop_words= es_stopwords)
    tf = tf_vectorizer.fit_transform(documents)
    tf_feature_names = tf_vectorizer.get_feature_names()

    topics = 5

    nmf = NMF(n_components=topics, random_state=1, alpha=.1, l1_ratio=.5, init='nndsvd').fit(tfidf)
    lda = LatentDirichletAllocation(n_topics=topics, max_iter=5, learning_method='online', learning_offset=50.,random_state=0).fit(tf)

    def display_topics(model, feature_names, no_top_words):
        for topic_idx, topic in enumerate(model.components_):
            print("Topico %d:" % (topic_idx))
            print(" ".join([feature_names[i]
                            for i in topic.argsort()[:-no_top_words - 1:-1]]))

    no_top_words = 10
    print("Usando NMF")
    display_topics(nmf, tfidf_feature_names, no_top_words)

    print("Usando LDA")
    display_topics(lda, tf_feature_names, no_top_words)


load_csv("debatePresidencial2018_amlo_evaluado.csv")
