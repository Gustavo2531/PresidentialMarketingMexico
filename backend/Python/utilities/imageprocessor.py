import cv2
from os import path

import skvideo.io
import tflearn
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.estimator import regression
import numpy as np

class Image_Processor(object):

    def __init__(self):
        file_path = path.dirname(path.realpath(__file__))
        self.datasets_path = path.join(file_path, "..", "..","..", "datasets")
        self.default_videos_folder = path.join(file_path, "..", "downloadedVideos")

        if not path.isfile(path.join(self.datasets_path, "cascade_frontalface_default.xml")):
            print("error no cascade file found, please download it and include it inside the datasets folder")
        else:
            self.cascadeClassifier = cv2.CascadeClassifier(path.join(self.datasets_path,"cascade_frontalface_default.xml"))
            print("Cascade classifier created")

    def get_frames(self, videos_folder_path = None, video_name = "anaya.mp4", frames = 30):

        if videos_folder_path is None:
            videos_folder_path = self.default_videos_folder

        full_path = path.join(videos_folder_path, video_name)
        vidcap = cv2.VideoCapture(full_path)

        #vidcap = skvideo.io.FFmpegReader(full_path, inputdict = inputparameters, outputdict= outputparameters)
        success, image = vidcap.read()
        count = 0
        final_count = 0
        success = True
        frames_result = []

        while success:
            success, image = vidcap.read()
            count += 1
            # Do this each # frames for this video
            if count % frames == 0:
                processed_image = self.reshape_image(image)
                if processed_image is not None:
                    #cv2.imshow('img', processed_image)
                    #cv2.waitKey(0)
                    #cv2.destroyAllWindows()
                    frames_result.append(processed_image)

                final_count += 1

        print("Processed frames: ", final_count)
        return frames_result


    def reshape_image(self, image):
        # Trasform if face_image is not grayscale
        if image is None:
            return None

        if len(image.shape) > 2 and image.shape[2] == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            image = cv2.imdecode(image, cv2.CV_LOAD_IMAGE_GRAYSCALE)

        faces = self.cascadeClassifier.detectMultiScale(image, scaleFactor=1.3, minNeighbors=5)

        if not len(faces) > 0:
            return None

        # Detect the biggest of all faces, since cascade can detect multiple faces. Then crops it
        biggest_face = faces[0]
        for face in faces:
            if face[2] * face[3] > biggest_face[2] * biggest_face[3]:
                biggest_face = face
        face = biggest_face
        image = image[face[1]:(face[1] + face[2]), face[0]:(face[0] + face[3])]

        # Resizes the cropped face into a 48*48 image
        try:
            image = cv2.resize(image, (48, 48), interpolation=cv2.INTER_CUBIC) / 255.
        except Exception:
            print("There was an error on the last step: resizing face_image")
            return None

        return image


'''
CLASSES = ['angry', 'disgusted', 'fearful', 'happy', 'sad', 'surprised', 'neutral']

# Create neural network
neuralNetwork = input_data(shape = [None, 48, 48, 1])
neuralNetwork = conv_2d(neuralNetwork, 64, 5, activation ='relu')
neuralNetwork = max_pool_2d(neuralNetwork, 3, strides = 2)
neuralNetwork = conv_2d(neuralNetwork, 64, 5, activation ='relu')
neuralNetwork = max_pool_2d(neuralNetwork, 3, strides = 2)
neuralNetwork = conv_2d(neuralNetwork, 128, 4, activation ='relu')
neuralNetwork = dropout(neuralNetwork, 0.3)
neuralNetwork = fully_connected(neuralNetwork, 3072, activation ='relu')
neuralNetwork = fully_connected(neuralNetwork, len(CLASSES), activation ='softmax')
neuralNetwork = regression(neuralNetwork, optimizer ='momentum', loss ='categorical_crossentropy')
model = tflearn.DNN(neuralNetwork)

processor = Image_Processor()
frames = processor.get_frames()

print(path.join(processor.datasets_path, "trainedFaceModel.tflearn"))
if path.isfile(path.join(processor.datasets_path, "trainedFaceModel.tflearn.meta")):
    model.load(path.join(processor.datasets_path, "trainedFaceModel.tflearn"))
    print("Trained emotion detection model located and loaded successfully")
else:
    print("No model found, make sure to train the model first")


predictions = []
for image in frames:
    originalImage = image
    image = image.reshape([-1, 48, 48, 1])


    cv2.imshow('Image', originalImage)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    prediction = model.predict(image)[0]
    print(prediction)
    predictions.append(prediction)



results = {
    CLASSES[0] : 0,
    CLASSES[1] : 0,
    CLASSES[2] : 0,
    CLASSES[3] : 0,
    CLASSES[4] : 0,
    CLASSES[5] : 0,
    CLASSES[6] : 0
}

for prediction in predictions:
    maxEmotion = CLASSES[np.argmax(prediction)]
    results[maxEmotion] += 1

print(results)
print("======== Emotion Results ========")
print("Percentage of emotions detected on video")
for emotion, result in results.items():
    percentage = result * 100 / len(predictions)
    print('%s : %f percent' % (emotion, percentage))
'''
