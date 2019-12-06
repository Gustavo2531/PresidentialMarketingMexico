from utilities.youtubedownloader import Youtube_Downloader
from utilities.imageprocessor import Image_Processor
from os import path
import cv2
import tflearn
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.estimator import regression
import numpy as np
import json

downloader = Youtube_Downloader()
image_processor = Image_Processor()
CLASSES = ['angry', 'disgusted', 'fearful', 'happy', 'sad', 'surprised', 'neutral']

def process_video():
    # 1 Download video, 2 get frames, 3 predict emotion, 4 store results
    if path.isfile(path.join(image_processor.default_videos_folder, video_id + ".mp4")):
        print("File already downloaded, analyzing it..")
        done_downloading(None, None)
    else:
        download_video(video_id)

def download_video(id):
    downloader.download_youtube_video(id, done_downloading)

def done_downloading(stream, file_handle):
    print("Getting frames now")
    filename = video_id + ".mp4"
    frames = image_processor.get_frames(video_name = filename)
    make_emotion_detection(frames)

def make_emotion_detection(frames):
    neuralNetwork = input_data(shape=[None, 48, 48, 1])
    neuralNetwork = conv_2d(neuralNetwork, 64, 5, activation='relu')
    neuralNetwork = max_pool_2d(neuralNetwork, 3, strides=2)
    neuralNetwork = conv_2d(neuralNetwork, 64, 5, activation='relu')
    neuralNetwork = max_pool_2d(neuralNetwork, 3, strides=2)
    neuralNetwork = conv_2d(neuralNetwork, 128, 4, activation='relu')
    neuralNetwork = dropout(neuralNetwork, 0.3)
    neuralNetwork = fully_connected(neuralNetwork, 3072, activation='relu')
    neuralNetwork = fully_connected(neuralNetwork, len(CLASSES), activation='softmax')
    neuralNetwork = regression(neuralNetwork, optimizer='momentum', loss='categorical_crossentropy')
    model = tflearn.DNN(neuralNetwork)

    print(path.join(image_processor.datasets_path, "trainedFaceModel.tflearn"))
    if path.isfile(path.join(image_processor.datasets_path, "trainedFaceModel.tflearn.meta")):
        model.load(path.join(image_processor.datasets_path, "trainedFaceModel.tflearn"))
        print("Trained emotion detection model located and loaded successfully")
    else:
        print("No model found, make sure to train the model first")

    predictions = []
    for image in frames:

        originalImage = image
        image = image.reshape([-1, 48, 48, 1])

            #cv2.imshow('Image', originalImage)
            #cv2.waitKey(0)
            #cv2.destroyAllWindows()

        prediction = model.predict(image)[0]
            #print(prediction)
        predictions.append(prediction)

    print_results(predictions)

def print_results(predictions):
    results = {
        CLASSES[0]: 0,
        CLASSES[1]: 0,
        CLASSES[2]: 0,
        CLASSES[3]: 0,
        CLASSES[4]: 0,
        CLASSES[5]: 0,
        CLASSES[6]: 0
    }

    for prediction in predictions:
        maxEmotion = CLASSES[np.argmax(prediction)]
        results[maxEmotion] += 1

    print("======== Emotion Results ========")
    print("Percentage of emotions detected on video")
    for emotion, result in results.items():
        percentage = result * 100 / len(predictions)
        print('%s : %f percent' % (emotion, percentage))

    with open(path.join(image_processor.default_videos_folder,"results",video_id + ".json"), 'w') as fp:
        json.dump(results, fp)



anaya_video = "sOGRbPMs0DY" # Nuevo video CAWqJ7LrMDM
meade_video = "R5-tKEjqrEU" # Nuevo video xkJrKktfSdg
amlo_video = "7O4wQ_8jOfU" # Nuevo video QnCCpq8GJrs , nuevo video lol : -2DzEA5_DyQ

video_id = "R-zCU0CVYAI"
process_video()
