import pandas as pd
from os import path
from utilities.modelgen import Sentiment_Model_Generator
from utilities.tassutilities import Tass_Utils
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from nltk.corpus import stopwords
from string import punctuation
from sklearn.decomposition import NMF, LatentDirichletAllocation
from datetime import datetime

file_path = path.dirname(path.realpath(__file__))
datasets_path = path.join(file_path, "..", "..", "datasets", "debatePresidencial2018")

model_gen = Sentiment_Model_Generator()
tass_utils = Tass_Utils()
model = model_gen.generate_model(tass_utils.completeCorpus)

menciones_anaya = pd.read_csv(path.join(datasets_path, "debatePresidencial2018_anaya.txt"), header = None, sep = "|", error_bad_lines= False)
menciones_anaya.columns = ["user", "location", "coords", "text", "created_at"]
menciones_anaya["created_at"] = pd.to_datetime(menciones_anaya["created_at"])
menciones_anaya["created_at"] = menciones_anaya["created_at"].dt.tz_localize("UTC").dt.tz_convert("America/Los_Angeles")
menciones_anaya["evaluation"] = model.predict(menciones_anaya.text)
print(menciones_anaya.sample(10))

'''
menciones_meade = pd.read_csv(path.join(datasets_path, "debatePresidencial2018_meade.txt"), header = None, sep = "|", error_bad_lines= False)
menciones_meade.columns = ["user", "location", "coords", "text", "created_at"]
menciones_meade["created_at"] = pd.to_datetime(menciones_meade["created_at"])
menciones_meade["created_at"] = menciones_meade["created_at"].dt.tz_localize("UTC").dt.tz_convert("America/Los_Angeles")
menciones_meade["evaluation"] = model.predict(menciones_meade.text)

menciones_obrador = pd.read_csv(path.join(datasets_path, "debatePresidencial2018_amlo.txt"), header = None, sep = "|", error_bad_lines= False)
menciones_obrador.columns = ["user", "location", "coords", "text", "created_at"]
menciones_obrador["created_at"] = pd.to_datetime(menciones_obrador["created_at"])
menciones_obrador["created_at"] = menciones_obrador["created_at"].dt.tz_localize("UTC").dt.tz_convert("America/Los_Angeles")
menciones_obrador["evaluation"] = model.predict(menciones_obrador.text)
'''

#menciones_anaya.to_csv(path.join(datasets_path,"debatePresidencial2018_anaya_evaluado.csv"))
#menciones_meade.to_csv(path.join(datasets_path,"debatePresidencial2018_meade_evaluado.csv"))
#menciones_obrador.to_csv(path.join(datasets_path,"debatePresidencial2018_amlo_evaluado.csv"))
