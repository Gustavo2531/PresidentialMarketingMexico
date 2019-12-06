'''
This is the only separated file since you need python 2.x to run it, activate the python 2.x env to make it work
'''
from utilities.twitterparser import Twitter_Parser
from mapsplotlib import mapsplot as mplt
from utilities.env import *

parser = Twitter_Parser()
tweets_with_location = parser.get_location_tweets(remove_locality = True)
mplt.register_api_key(maps_api_key)
mplt.density_plot(tweets_with_location['latitude'], tweets_with_location['longitude'])
