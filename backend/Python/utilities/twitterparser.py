import pandas as pd
import numpy as np
from os.path import join
from os.path import isfile
from os import path

class Twitter_Parser(object):

    def __init__(self):
        """
        datasets_path = join(".", "datasets")

        if(not isfile(join(datasets_path, "tweets.csv"))):
            print("No tweets.csv found, generating tweets csv....")
            self.tweets = self.generate_tweet_csv()
        else:
            print("Tweets.csv file found, loading it..")
            self.tweets = pd.read_csv(join(datasets_path, "tweets.csv"))
            """

    def generate_tweet_csv(self):
        """
        Generates the tweets.csv file by loading tweets.txt, the latter comes from the Node.js app to get streaming tweets in Mexico City
        :return: Nothing, but generates a tweets.csv file inside ./datasets
        """
        tweets = pd.read_csv('./datasets/tweets.txt', header = None, sep = "|", error_bad_lines = False)
        tweets.columns = ['user', 'locality', 'location', 'text']
        tweets.to_csv('./datasets/tweets.csv', index=False)
        return

    def get_location_tweets(self, remove_locality = False):
        """
        Returns a dataframe that contains tweets which location is NOT undefined along with separated latitude and longitude
        :return: Dataframe with location info (latitude and longitude)
        """
        location_tweets = self.tweets[self.tweets.location != 'undefined'].copy() # we make a copy so we can modify the data_frame

        # Get coordinates and convert them to numeric values
        location_tweets['longitude'] = location_tweets.location.apply(lambda x: x.split(',')[0])
        location_tweets['latitude'] = location_tweets.location.apply(lambda x: x.split(',')[1])
        location_tweets['longitude'] = pd.to_numeric(location_tweets.longitude)
        location_tweets['latitude'] = pd.to_numeric(location_tweets.latitude)

        # Remove location attribute, since we no longer use it
        del location_tweets['location']
        if(remove_locality):
            del location_tweets['locality']

        # Remove outliers, we want the ones that are inside Mexico City's boundaries
        cdmx = [-99.326777, 19.18871, -98.960448, 19.592757]
        minimum_longitude = cdmx[0]
        maximum_longitude = cdmx[2]
        minimum_latitude = cdmx[1]
        maxium_latitude = cdmx[3]

        location_tweets = location_tweets[
            (location_tweets.longitude > minimum_longitude) & (location_tweets.longitude < maximum_longitude)
            & (location_tweets.latitude > minimum_latitude) & (location_tweets.latitude < maxium_latitude)
        ]

        return location_tweets.reset_index()

    def parse_candidate_tweets(self, filename):
        datasets_path = join(".", "datasets")

        if (not isfile(join(datasets_path, filename))):
            print("Error, file not found", filename)
            return
        else:
            print("Loading", filename, "file..")
            #df = pd.read_fwf(join(datasets_path, filename), header = None)
            #df.replace(['NaN'], np.nan, inplace=True)
            #df.dropna(axis = 1, how='all', inplace=True)
            df = pd.read_table(join(datasets_path, filename), header=None)
            df.columns = ["text"]

            return df

    def parse_candidate_favs(self, filename):
        file_path = path.dirname(path.realpath(__file__))
        datasets_path = path.join(file_path, "..", "..", "..", "datasets")

        if(not isfile(join(datasets_path,filename))):
            print("Error, file not found", filename)
            return
        else:
            print("Loading", filename, "file..")

            df = pd.read_csv(join(datasets_path,filename), header=None, error_bad_lines=False)
            df.columns = ["text", "favorites"]
            #df.replace(['NaN'], np.nan, inplace=True)
            df = df.dropna(axis = 0, how='any')


            return df


