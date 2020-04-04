from __future__ import print_function
import httplib2
import os
import io

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from apiclient import errors

from google.oauth2 import service_account

from apiclient.http import MediaFileUpload, MediaIoBaseDownload

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

SCOPES = ['https://www.googleapis.com/auth/drive']

# Our file explorer class, this downloads all data from our Google Doc
# It also formats all this data and returns it wrapped in a JSON object
class FileExporter:

    #Function to format all the data stored in the google doc
    def format_data(self,data):
        
        #Split data up by each new line
        lineSplit = data.splitlines()

        lineSplit[0] = lineSplit[0][1:] #Trim first line to get rid of \ufeff

        infoTitles = [] #Array to hold title of info point
        infoContent = [] #Array to hold content of info point

        cardContent = [] #Array to hold all info points

        quizContent = {'question' : '', 'correct' : '', 'answers' : []} #Dictionary to hold all question data 
        quizAnswers = [] #Array to hold all quiz answers
        quizArray = [] #Array to hold all questions belonging to 1 info point

        for i in lineSplit: #Loop through every line in Google Doc
            if len(i) > 0 : 
                if i[0] == "^": #These if statements check first character in line
                    if len(infoTitles) > 0:
                        if quizContent['question'] != '':
                            quizArray.append(quizContent)
                            quizContent = {'question' : '', 'correct' : '', 'answers' : []}

                        #Create object for each info card
                        object = { 
                            "title" : infoTitles,
                            "content" : infoContent,
                            "quizContent" : quizArray
                        } 
                        cardContent.append(object) #Add info card to array of all info cards

                    #Empty all arrays
                    infoTitles = []
                    infoContent = []
                    quizArray = []

                    infoTitles.append(i[1:])

                elif i[0] == "*": # Looking for bullet point belonging to info card
                    infoContent.append(i[1:])
                elif i[0] == "-": # Looking for a quiz question
                    if quizContent['question'] != '':
                        quizArray.append(quizContent)

                    quizContent = {'question' : '', 'correct' : '', 'answers' : []}
                    quizContent["question"] = i[1:]
                    quizAnswers = []
                elif i[0] == "=": # Looking for correct answer to quiz question
                    quizContent["correct"] = i[1:]
                    quizAnswers.append(i[1:])
                    quizContent['answers'] = quizAnswers
                elif i[0] == "#": # Looking for incorrect answer to quiz question
                    quizAnswers.append(i[1:])
                    quizContent['answers'] = quizAnswers
                else:
                    if len(infoContent) > 0 :
                        infoContent[-1:] = infoContent[-1:] + i

        quizArray.append(quizContent)

        # Format is that each object is an info card, which has a title and a set of bullet points
        # Each info card also has each question associated with it
        object = { 
            "title" : infoTitles,
            "content" : infoContent,
            "quizContent" : quizArray
        }
        cardContent.append(object)
        return cardContent
    
    # Function for accessing Google Doc and downloading all data stored in it
    def download_file(self,service,file_id,mime_type,filepath):
        """Downloads files belonging to a folder (ignores subfolders).
        Args:
        service: Drive API service instance.
        file_id: Drive file id
        filepath: where to save the file
        """       
        file = service.files().get(fileId=file_id,fields='name').execute()
        filepath = filepath + file.get('name')

        request = service.files().export(fileId=file_id, mimeType=mime_type)
        
        fh = io.BytesIO()
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print("Download %d%%." % int(status.progress() * 100))

        data = fh.getvalue()
        string = data.decode("utf-8") 

        info_points = self.format_data(string)

        return info_points
            

    # Function to initialise the file exporter
    # Sets up access to the Google Doc
    def init(self):
        SERVICE_ACCOUNT_KEY = 'desqol-d6756a6f656c.json'

        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_KEY, scopes=SCOPES)
        
        service = discovery.build('drive', 'v3', credentials=credentials)
        return service