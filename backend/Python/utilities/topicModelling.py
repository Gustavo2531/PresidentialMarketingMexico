from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from nltk.corpus import stopwords
from string import punctuation
from twitterparser import Twitter_Parser

from sklearn.decomposition import NMF, LatentDirichletAllocation

twitter_parser = Twitter_Parser()
#documents = twitter_parser.parse_candidate_tweets("RicardoAnayaC_tweets_text.txt")
documents = twitter_parser.parse_candidate_tweets("lopezobrador_tweets_text.txt")
documents = documents['text'].values.tolist()

features = 1000
es_stopwords = stopwords.words("spanish")
punctuation_words = list(punctuation)
punctuation_words.extend(['¿', '¡'])

# NMF
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=features, stop_words='english')
tfidf = tfidf_vectorizer.fit_transform(documents)
tfidf_feature_names = tfidf_vectorizer.get_feature_names()

# LDA
tf_vectorizer = CountVectorizer(max_df=0.95, min_df=2, max_features=features, stop_words='english')
tf = tf_vectorizer.fit_transform(documents)
tf_feature_names = tf_vectorizer.get_feature_names()

topics = 5

# Run NMF
nmf = NMF(n_components=topics, random_state=1, alpha=.1, l1_ratio=.5, init='nndsvd').fit(tfidf)

# Run LDA
lda = LatentDirichletAllocation(n_topics=topics, max_iter=5, learning_method='online', learning_offset=50.,random_state=0).fit(tf)

def display_topics(model, feature_names, no_top_words):
    for topic_idx, topic in enumerate(model.components_):
        print("Topic %d:" % (topic_idx))
        print(" ".join([feature_names[i]
                        for i in topic.argsort()[:-no_top_words - 1:-1]]))

no_top_words = 10
print("Usando NMF")
display_topics(nmf, tfidf_feature_names, no_top_words)

print("Usando LDA")
display_topics(lda, tf_feature_names, no_top_words)
