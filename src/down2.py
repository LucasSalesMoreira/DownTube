from pytube import YouTube
from moviepy.editor import *

def convertMP3(pathArray):
    for i in range(len(pathArray)):
        fileArray = os.listdir(pathArray[i])
        for j in range(len(fileArray)):
            pathMP4 = '{}{}'.format(pathArray[i], fileArray[j])
            videoClip = VideoFileClip(pathMP4)
            audioClip = videoClip.audio

            fileNameMP3 = pathMP4.split('.mp4')
            pathMP3 = '{}.mp3'.format(fileNameMP3[0])
            audioClip.write_audiofile(pathMP3)

            audioClip.close()
            videoClip.close()
            print('------ CONVERSAO FINALIZADA! ------')

def downloadVideo(links, path):
    linkArray = links.split(' ')
    pathArray = []
    for i in range(len(linkArray)):
        yt = YouTube(linkArray[i])
        print('Autor do video: {}'.format(yt.author))
        print('Título: {}'.format(yt.title))
        print('Views: {}'.format(yt.views))
        print('Descrição do video: {}'.format(yt.description))

        print(yt.streams.all)
        
        # Filtrando as Streams, ordenando pela resolução de forma decrescente e pegando a primeira Stream da lista.
        stream = yt.streams.filter(progressive = True, file_extension = 'mp4').order_by('resolution').desc().first()

        print('Stream selecionada -> {}'.format(stream))
        print('Baixando seu video...')

        savePath = '{}/{}/'.format(path, yt.author)

        stream.download(savePath)
            
        try:
            pathArray.index(savePath)            
        except:
            pathArray.append(savePath)
            print(pathArray)
            
        print('------ DOWNLOAD FINALIZADO! ------')
        
    convertMP3(pathArray)

def getInputs():
    links = input('Links (separados por espaço):')
    path = input('Caminho de salvamento:')
    downloadVideo(links, path)


getInputs()