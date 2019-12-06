from wordcloud import WordCloud
from os import path

def generate_word_cloud(file_name = "JoseAMeadeK_tweets_text.txt"):
    '''
    Creates a word cloud from the specified .txt file
    :param file_name: the file name where we are going to take the text, we are passing a file that contains all tweets, file must be present inside the datasets folder
    :return:
    '''

    datasets_path = path.join(".", "datasets")
    text_contents = open(path.join(datasets_path, file_name)).read()
    stop_words = ["https", "RT", "a", "el", "la", "con", "de", "que", "un",
                  "le", "del", "no", "los", "se","su", "sus","ellos", "ellas",
                  "en", "al", "es", "para", "contra","RicardoAnayaC", "JoseAMeadeK",
                  "co", "me", "las", "por", "como", "pero", "una", "mi", "ni", "lo",
                  "eso", "que", "un","sus", "más", "todo"]

    wordCloud = WordCloud(background_color="white", width=1000, height=600,stopwords=stop_words,max_font_size=250).generate(text_contents)
    image = wordCloud.to_image()
    image.show()
