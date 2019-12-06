from pytube import YouTube
from os import path

class Youtube_Downloader(object):

    def __init__(self):
        file_path = path.dirname(path.realpath(__file__))
        self.output_path = path.join(file_path, "..", "downloadedVideos")

    def download_mp4_file(self, url, on_done_callback = None):
        yt = YouTube(url)
        yt.register_on_progress_callback(self.show_progress)
        if on_done_callback is not None:
            yt.register_on_complete_callback(on_done_callback)

        stream = yt.streams.filter(subtype = 'mp4').first()

        print("Starting to download Stream: ", stream)
        stream.download(self.output_path, filename = "")
        print("Finished downloading Stream: ", stream)

    def download_youtube_video(self, id, on_done_callback = None):
        yt = YouTube("http://youtube.com/watch?v={}".format(id))
        yt.register_on_progress_callback(self.show_progress)
        if on_done_callback is not None:
            yt.register_on_complete_callback(on_done_callback)

        #stream = yt.streams.filter(subtype='mp4').first()
        stream = yt.streams.filter(progressive = True, file_extension='mp4') \
            .order_by('resolution') \
            .desc() \
            .first()

        print("Starting to download Stream: ", stream)
        stream.download(self.output_path, filename=id)
        print("Finished downloading Stream: ", stream)

    def show_progress(self, stream, chunk, file_handle, bytes_remaining):
        print("Downloading... bytes remaining: ", bytes_remaining)
        return

