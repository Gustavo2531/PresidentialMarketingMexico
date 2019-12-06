from lxml import objectify
from os.path import isfile
from os import path
import pandas as pd
import xml.etree.ElementTree as ET
from os.path import join

class Tass_Utils(object):
    """
        Class that is in charge of transforming TASS (http://www.sepln.org/workshops/tass) datasets (xml) to csv and merge them into a single Pandas DataFrame
    """
    def __init__(self):
        file_path = path.dirname(path.realpath(__file__))
        datasets_path = path.join(file_path, "..", "..","..","datasets")
        #datasets_path = join(".","datasets")
        self.completeCorpus = self.convert_tass_datasets( join(datasets_path,"general-train-tagged.xml"),
                                                          join(datasets_path, "general-test-tagged.xml"),
                                                          join(datasets_path, "intertass-train-tagged.xml"),
                                                          join(datasets_path, "intertass-development-tagged.xml"),
                                                          join(datasets_path, "stompol-train-tagged.xml"),
                                                          join(datasets_path, "stompol-test-tagged.xml"),
                                                          join(datasets_path, "socialtv-test-tagged.xml"),
                                                          join(datasets_path, "socialtv-train-tagged.xml"),
                                                          join(datasets_path, "politics-test-tagged.xml"),
                                                         )

    def check_if_path_correct(self,filePath):
        """ Checks if file exists in given path """
        if(not isfile(filePath)):
            print("Incorrect File Path, please ensure path to file is correct")
            return False
        else:
            return True

    def get_tweets_from_xml(self, xmlFilePath):
        """ Returns tweets data from an XML FilePath (returns the root of the document containing an iterable list of tweets) """
        print(xmlFilePath)
        if(not self.check_if_path_correct(xmlFilePath)):
            return

        return objectify.parse(open(xmlFilePath, encoding ="utf-8")).getroot().getchildren()

    def process_general_train_dataset(self, xmlFilePath):
        """ Utility function to process the general tweets train dataset (for 2012 TASS Workshop) """
        tweets      = self.get_tweets_from_xml(xmlFilePath)
        dataFrame   = pd.DataFrame(columns=('text', 'sentiment', 'agreement', 'topic'))

        for i in range(0, len(tweets)):
            tweet = tweets[i]
            headers = ['text', 'sentiment', 'agreement', 'topic']
            content = [tweet.content.text, tweet.sentiments.polarity.value.text,
                      tweet.sentiments.polarity.type.text, tweet.topics.topic.text]
            row = pd.Series(dict(zip(headers, content)))
            row.name = i
            dataFrame = dataFrame.append(row)

        # Save file with the same filename in the same folder, but as a CSV
        dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index = False, encoding = 'utf-8')
        print("Succesfully processed: " +path.splitext(xmlFilePath)[0])
        return dataFrame

    def process_general_test_dataset(self, xmlFilePath):
        """ Utility function to process the general tweets test dataset (for 2012 TASS Workshop) """
        tweets      = self.get_tweets_from_xml(xmlFilePath)
        dataFrame   = pd.DataFrame(columns=('text', 'sentiment', 'topic'))

        for i in range(0, len(tweets)):
            tweet = tweets[i]
            headers = ['text', 'sentiment', 'topic']
            content = [tweet.content.text, tweet.sentiments.polarity.value.text, tweet.topics.topic.text]
            row = pd.Series(dict(zip(headers, content)))
            row.name = i
            dataFrame = dataFrame.append(row)

        # Save file with the same filename in the same folder, but as a CSV
        dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index = False, encoding = 'utf-8')
        print("Succesfully processed: " +path.splitext(xmlFilePath)[0])
        return dataFrame

    def process_politics_test_dataset(self,xmlFilePath):
        tweets    = self.get_tweets_from_xml(xmlFilePath)
        dataFrame = pd.DataFrame(columns=('text', 'sentiment', 'topic'))

        for i in range(0,len(tweets)):
            tweet   = tweets[i]
            headers = ['text', 'sentiment', 'topic']
            content = [tweet.content.text, tweet.sentiments.polarity.value.text, tweet.topics.topic.text]
            row     = pd.Series(dict(zip(headers, content)))
            row.name= i
            dataFrame = dataFrame.append(row)

        dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index=False, encoding='utf-8')
        print("Succesfully processed: " + path.splitext(xmlFilePath)[0])
        return dataFrame

    def process_stompol_train_dataset(self, xmlFilePath):
         dataFrame = pd.DataFrame(columns=('text','sentiment','aspect','entity'))
         tree = ET.parse(xmlFilePath)
         nodes = tree.getroot().findall('tweet')
         i = 0

         for tweet in nodes:
              text      =  ''.join(tweet.itertext())
              headers   =  ['text', 'sentiment', 'aspect', 'entity']
              aspect    =  tweet.find('sentiment').attrib['aspect']
              sentiment =  tweet.find('sentiment').attrib['polarity']
              entity    =  tweet.find('sentiment').attrib['entity']
              content   =  [text, sentiment, aspect, entity]
              row       =  pd.Series(dict(zip(headers,content)))
              row.name = i
              dataFrame = dataFrame.append(row)
              i+=1

         dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index=False, encoding='utf-8')
         print("Succesfully processed: " + path.splitext(xmlFilePath)[0])

         return dataFrame

    def process_stompol_test_dataset(self, xmlFilePath):
         dataFrame = pd.DataFrame(columns=('text','sentiment','aspect','entity'))
         tree = ET.parse(xmlFilePath)
         nodes = tree.getroot().findall('tweet')
         i = 0

         for tweet in nodes:
              text      =  ''.join(tweet.itertext())
              headers   =  ['text', 'sentiment', 'aspect', 'entity']
              aspect    =  tweet.find('sentiment').attrib['aspect']
              sentiment =  tweet.find('sentiment').attrib['polarity']
              entity    =  tweet.find('sentiment').attrib['entity']
              content   =  [text, sentiment, aspect,
                         entity]
              row       =  pd.Series(dict(zip(headers,content)))
              row.name = i
              dataFrame = dataFrame.append(row)
              i+=1

         dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index=False, encoding='utf-8')
         print("Succesfully processed: " + path.splitext(xmlFilePath)[0])

         return dataFrame

    def process_socialtv_test_dataset(self, xmlFilePath):
         dataFrame = pd.DataFrame(columns=('text','sentiment','aspect','entity'))
         tree = ET.parse(xmlFilePath)
         nodes = tree.getroot().findall('tweet')
         i = 0

         for tweet in nodes:
              text      =  ''.join(tweet.itertext())
              headers   =  ['text', 'sentiment', 'aspect']
              aspect    =  tweet.find('sentiment').attrib['aspect']
              sentiment =  tweet.find('sentiment').attrib['polarity']
              content   =  [text, sentiment, aspect]
              row       =  pd.Series(dict(zip(headers,content)))
              row.name = i
              dataFrame = dataFrame.append(row)
              i+=1

         dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index=False, encoding='utf-8')
         print("Succesfully processed: " + path.splitext(xmlFilePath)[0])

         return dataFrame

    def process_socialtv_train_dataset(self, xmlFilePath):
         dataFrame = pd.DataFrame(columns=('text','sentiment','aspect','entity'))
         tree = ET.parse(xmlFilePath)
         nodes = tree.getroot().findall('tweet')
         i = 0

         for tweet in nodes:
              text      =  ''.join(tweet.itertext())
              headers   =  ['text', 'sentiment', 'aspect']
              aspect    =  tweet.find('sentiment').attrib['aspect']
              sentiment =  tweet.find('sentiment').attrib['polarity']
              content   =  [text, sentiment, aspect]
              row       =  pd.Series(dict(zip(headers,content)))
              row.name = i
              dataFrame = dataFrame.append(row)
              i+=1

         dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index=False, encoding='utf-8')
         print("Succesfully processed: " + path.splitext(xmlFilePath)[0])

         return dataFrame

    def process_intertass_development_dataset(self,xmlFilePath):
          tweets    = self.get_tweets_from_xml(xmlFilePath)
          dataFrame = pd.DataFrame(columns=('text','sentiment'))

          for i in range(0,len(tweets)):
              tweet    =  tweets[i]
              headers  =  ['text', 'sentiment']
              content  =  [tweet.content.text,tweet.sentiment.polarity.value.text]
              row      =  pd.Series(dict(zip(headers,content)))
              row.name =  i
              dataFrame = dataFrame.append(row)
          dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index = False, encoding = 'utf-8')
          print("Succesfully processed: " +path.splitext(xmlFilePath)[0])
          return dataFrame

    def process_intertass_train_dataset(self,xmlFilePath):
          tweets    = self.get_tweets_from_xml(xmlFilePath)
          dataFrame = pd.DataFrame(columns=('text','sentiment'))
          for i in range(0,len(tweets)):
              tweet     =  tweets[i]
              headers   =  ['text','sentiment']
              content   =  [tweet.content.text,tweet.sentiment.polarity.value.text]
              row       = pd.Series(dict(zip(headers,content)))
              row.name  = i
              dataFrame = dataFrame.append(row)

          dataFrame.to_csv(path.splitext(xmlFilePath)[0] + ".csv", index = False, encoding = 'utf-8')
          print("Succesfully processed:  " +path.splitext(xmlFilePath)[0])
          return dataFrame

    def merge_data_frames(self, generalTainDF, generalTestDf, intertassTrainDF, intertassDevelopmentDF, stompolTrainDF, stompolTestDF, socialTVTestDF, socialTVTrainDF, politicsTestDF):
        """ Merges all generated datasets into a single DataFrame """
        completeCorpus = pd.concat([
            generalTainDF,
            generalTestDf,
            intertassTrainDF,
            intertassDevelopmentDF,
            stompolTrainDF,
            stompolTestDF,
            socialTVTestDF,
            socialTVTrainDF,
            politicsTestDF
        ])

        # Clean corpus
        completeCorpus = completeCorpus.query('agreement != "DISAGREEMENT" and sentiment != "NONE"')
        completeCorpus = completeCorpus[-completeCorpus.text.str.contains('^http.*$')]

        # Remove neutral tweets and transform into a binary sentiment analysis (instead of 5 clases)
        completeCorpus = completeCorpus[completeCorpus.sentiment != 'NEU']
        completeCorpus['sentiment_polarity'] = 0
        completeCorpus.sentiment_polarity[completeCorpus.sentiment.isin(['P', 'P+'])] = 1
        completeCorpus.sentiment_polarity.value_counts(normalize = True)

        print("Succesfully Constructed Merged Dataset with shape:")
        print(completeCorpus.shape)
        return completeCorpus

    def convert_tass_datasets(self, generalTrainDatasetPath, generalTestDatasetPath, intertassTrainDatasetPath, intertassDevelopmentDatasetPath, stompolTrainDatasetPath, stompolTestDatasetPath, socialTVTestDatasetPath,socialTVTrainDatasetPath, politicsTestDatasetPath):
        """ Utility function to try and parse all xml files, if they are already present as a CSV file, then we get them from there and merge them. """

        if(not isfile(path.splitext(generalTrainDatasetPath)[0] + ".csv")):
            generalTrainDataset = self.process_general_train_dataset(generalTrainDatasetPath)
        else:
            generalTrainDataset = pd.read_csv(path.splitext(generalTrainDatasetPath)[0] + ".csv")
            print("Loaded general train dataset....")

        if(not isfile(path.splitext(generalTestDatasetPath)[0] + ".csv")):
            generalTestDataset = self.process_general_test_dataset(generalTestDatasetPath)
        else:
            generalTestDataset = pd.read_csv(path.splitext(generalTestDatasetPath)[0] + ".csv")
            print("Loaded general test dataset...")

        if (not isfile(path.splitext(intertassTrainDatasetPath)[0] + ".csv")):
            intertassTrainDataset = self.process_intertass_train_dataset(intertassTrainDatasetPath)
        else:
            intertassTrainDataset = pd.read_csv(path.splitext(intertassTrainDatasetPath)[0] + ".csv")
            print("Loaded intertass train dataset...")

        if (not isfile(path.splitext(intertassDevelopmentDatasetPath)[0]+".csv")):
            intertassDevelopmentDataset = self.process_intertass_development_dataset(intertassDevelopmentDatasetPath)
        else:
            intertassDevelopmentDataset = pd.read_csv(path.splitext(intertassDevelopmentDatasetPath)[0]+ ".csv")
            print("Loaded intertass development dataset...")

        if (not isfile(path.splitext(stompolTrainDatasetPath)[0]+".csv")):
            stompolTrainDataset = self.process_stompol_train_dataset(stompolTrainDatasetPath)
        else:
            stompolTrainDataset = pd.read_csv(path.splitext(stompolTrainDatasetPath)[0]+ ".csv")
            print("Loaded stompol train dataset...")

        if (not isfile(path.splitext(stompolTestDatasetPath)[0]+".csv")):
            stompolTestDataset = self.process_stompol_test_dataset(stompolTestDatasetPath)
        else:
            stompolTestDataset = pd.read_csv(path.splitext(stompolTestDatasetPath)[0]+ ".csv")
            print("Loaded stompol test dataset...")

        if (not isfile(path.splitext(socialTVTestDatasetPath)[0]+".csv")):
            socialTVTestDataset = self.process_socialtv_test_dataset(socialTVTestDatasetPath)
        else:
            socialTVTestDataset = pd.read_csv(path.splitext(socialTVTestDatasetPath)[0]+ ".csv")
            print("Loaded social tv test dataset...")

        if (not isfile(path.splitext(socialTVTrainDatasetPath)[0]+".csv")):
            socialTVTrainDataset = self.process_socialtv_train_dataset(socialTVTrainDatasetPath)
        else:
            socialTVTrainDataset = pd.read_csv(path.splitext(socialTVTrainDatasetPath)[0]+ ".csv")
            print("Loaded social tv test dataset...")

        if (not isfile(path.splitext(politicsTestDatasetPath)[0]+".csv")):
            politicsTestDataset = self.process_politics_test_dataset(politicsTestDatasetPath)
        else:
            politicsTestDataset = pd.read_csv(path.splitext(politicsTestDatasetPath)[0]+ ".csv")
            print("Loaded politics test dataset...")

        return self.merge_data_frames(generalTrainDataset, generalTestDataset,intertassTrainDataset,
                                      intertassDevelopmentDataset,stompolTrainDataset,stompolTestDataset,
                                      socialTVTestDataset, socialTVTrainDataset, politicsTestDataset
                                      )





