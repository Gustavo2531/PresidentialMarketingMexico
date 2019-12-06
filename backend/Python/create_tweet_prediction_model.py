from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.cluster import KMeans

from utilities.tassutilities import Tass_Utils
from utilities.twitterparser import  Twitter_Parser

import matplotlib.pyplot as plt

import sys

import pandas as pd


def create_tweet_prediction_model(candidate_file_name ="RicardoAnayaC"):

    parser = Twitter_Parser()
    data_frame = parser.parse_candidate_favs(candidate_file_name)


    vectorizer = HashingVectorizer(n_features=27)
    vectorized_text = vectorizer.transform(data_frame.text).toarray()
    # Data Frame that has columns 1....27 with each value
    vectorized_df = pd.DataFrame(vectorized_text)

    # Paste both data_frames
    data_frame = data_frame.join(vectorized_df)
    # Drop na's generated if any
    data_frame = data_frame.dropna(axis=0, how='any')
    # drop text column so we can divide the class as 'favorites' and the attributes as the 27 other columns
    data_frame = data_frame.drop(['text'], axis=1)

    #print(data_frame.sample(10))

    # segun yo el X son las columnas que usamos como features, osea ->
    x = data_frame.drop(['favorites'], axis = 1 ).copy()
    # y el Y son las clases que quieres predecir,en este caso la columna 'favoritos'
    y = data_frame['favorites'].copy()

    # Using k-means to assign classes
    y = y.reset_index()

    kmeans = KMeans(n_clusters = 4)
    kmeans.fit(y)
    y_predictions = kmeans.predict(y)



    #plt.scatter(y.iloc[:, 0], y.iloc[:, 1], c=y_predictions, s=10)
    centers = kmeans.cluster_centers_
    #plt.scatter(centers[:, 0], centers[:, 1], c='black', s=200, alpha=0.5)

    y.columns = ['index', 'favorites']
    y = y.drop(['index'], axis=1)
    y['favorites'] = y_predictions
    #print(y.sample(10))

    #entrenar el arbol
    trainX, testX, trainY, testY = train_test_split(x,y,random_state=1,test_size=.21)
    #tree = DecisionTreeClassifier(criterion='entropy')
    #tree.fit(trainX,trainY)
    #predictions = tree.predict((testX))

    #Random Forest
    random_forest = RandomForestClassifier(n_estimators=30, max_depth=10,random_state=1)
    random_forest.fit(trainX,trainY.values.ravel())
    predictionRandomForest = random_forest.predict(testX)

    # Gaussian Naive Bayes
    #gnb = GaussianNB()
    #gnb.fit(trainX,trainY)

    #predictionGNB = gnb.predict(testX)

    #KNN
    #neighbor = KNeighborsClassifier(n_neighbors=4)
    #neighbor.fit(trainX,trainY)
    #neighborPrediction = neighbor.predict(testX)

    #Logistic Regression
    #logistic_regression = LogisticRegression()
    #logistic_regression.fit(trainX,trainY)
    #logistic_prediction = logistic_regression.predict(testX)

    #print("Logistic Regression accuracy score: ", accuracy_score(testY, logistic_prediction))
    #print("Neighbor accuracy score: ", accuracy_score(testY, neighborPrediction))


    #print("Prediction using random forest: ", predictionRandomForest)
    print("Random forest accuracy score: ", accuracy_score(testY, predictionRandomForest))

    #print("Prediction using naive bayes: ", predictionGNB)
    #print("GNB accuracy score: ", accuracy_score(testY, predictionGNB))
    #print(tree.predict(testX))

    #print("Accuracy of decision tree is :" ,accuracy_score(testY,predictions))


    #vectorized_textos_prueba = vectorizer.transform(textos_prueba).toarray()

    #textos_prueba_df = pd.DataFrame(vectorized_textos_prueba)
    #print(random_forest.predict(textos_prueba_df))

    #plt.ylabel('favorite count')
    #plt.title(candidate_file_name)

    #plt.show()

    #new_y = y.copy()
    #new_y['favEvaluation'] = tree.predict(x)
    #print( tree.predict(x))
    #print(new_y.shape)
    #new_y.to_csv("tree_evaluation_anaya.csv", header=True)


    # esos dos data_frames: x & y los puedes usar para entrenar algo, intenta con un decision tree y saca su score a ver que nos sale jaja
    # para entrenar algo viene en la cosa esa de escarcega de sistemas inteligentes


    return random_forest,vectorizer

def predict_tweet(tweet,filename):
    sentence = []
    sentence.append(tweet)

    random_forest, vectorizer = create_tweet_prediction_model(filename)

    vectorized_textos_prueba = vectorizer.transform(sentence).toarray()
    textos_prueba_df = pd.DataFrame(vectorized_textos_prueba)

    print(random_forest.predict(textos_prueba_df))

if __name__ == "__main__":
    if len(sys.argv) is not 3:
        print("Usage create tweet prediction model.py tweet filename")
    else:
        predict_tweet(sys.argv[1],sys.argv[2])
