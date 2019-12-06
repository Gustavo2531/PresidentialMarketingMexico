import pandas as pd
from os import path
from utilities.modelgen import Sentiment_Model_Generator
from utilities.tassutilities import Tass_Utils

file_path = path.dirname(path.realpath(__file__))
datasets_path = path.join(file_path, "..", "..", "datasets", "youtubeComments")

model_gen = Sentiment_Model_Generator()
tass_utils = Tass_Utils()
model = model_gen.generate_model(tass_utils.completeCorpus)

def evaluate_youtube_comments(videoId, fileName):
    print("\n ****** Processing file: {} ******".format(fileName))
    comments = pd.read_csv(path.join(datasets_path, "{}_youtube_comments.txt".format(videoId)), header = None, sep = "|", error_bad_lines=False)
    comments.columns = ["published_at", "text"]
    comments["evaluation"] = model.predict(comments.text)

    print("Comments evaluated, saving them inside the datasets folder")
    comments.to_csv(fileName)
    print("Comments saved")

    print("======= Stats for file: {} =======\n".format(fileName))
    print(comments.evaluation.value_counts())



evaluate_youtube_comments("-2DzEA5_DyQ", path.join(datasets_path, "comments_amlo_video_evaluated.csv"))
evaluate_youtube_comments("R-zCU0CVYAI", path.join(datasets_path, "comments_anaya_video_evaluated.csv"))
evaluate_youtube_comments("xkJrKktfSdg", path.join(datasets_path, "comments_meade_video_evaluated.csv"))
