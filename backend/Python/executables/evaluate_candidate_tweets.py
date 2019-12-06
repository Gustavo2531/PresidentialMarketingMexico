from utilities.twitterparser import  Twitter_Parser
from utilities.modelgen import Sentiment_Model_Generator
from utilities.tassutilities import Tass_Utils

def evaluate_candidate_tweets(candidate_file_name = "RicardoAnayaC_tweets_text.txt"):
    '''
    Creates a dataset with evaluation for all candidate tweets, you need to run the Node/main.js to generate the dataset, it is taken from the datasets folder
    :return:
    '''
    # Create Model Generator and model
    model_gen = Sentiment_Model_Generator()
    tass_utils = Tass_Utils()
    model = model_gen.generate_model(tass_utils.completeCorpus)

    # Create twitter parser to load tweets as dataframe
    parser = Twitter_Parser()
    data_frame = parser.parse_candidate_tweets(candidate_file_name)

    # Evaluate
    data_frame['evaluation'] = model.predict(data_frame.text)

    # Gather results
    results = data_frame['evaluation'].value_counts()
    positives = results[1]
    negatives = results[0]
    totals = positives + negatives

    #print("Total tweets evaluated:", totals)
    #print("Positive tweets:", positives * 100 / totals, "%")
    #print("Negavite tweets:", negatives * 100 / totals, "%")

    return {
        'positives' : positives,
        'negatives' : negatives,
        'positivesPercentage': format(positives * 100 / totals, '.1f'),
        'negativesPercentage': format(negatives * 100 / totals, '.1f'),
        'total'     : totals
    }
