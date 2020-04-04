from flask import Flask, url_for, Response, request
import pypyodbc
import json
from database_manager import DatabaseManager
from passlib.hash import pbkdf2_sha256
from export_file import FileExporter
from datetime import datetime   

app = Flask(__name__)

# Instantiate our database manager
database_manager = DatabaseManager()
settings = {
	'debug':True	#includes autoreload
}

# Intstantiate and initialise file exporter object
exporter = FileExporter() 
service = exporter.init()

# File id for the Google Doc that our data is stored in
file_id='14PaKknXLogPAKaPBhqQsBLO8DohPpEufB1o2szCUCfw'

# API call for when a user has completed the quiz, this call receives users score in quiz
# It then checks this score against the current highscore. If the new score is higher, it becomes the new highscore
@app.route('/score', methods=['POST'])
def api_check_score():

    # Get variables passed by request
    username = request.get_json()['username']
    val = request.get_json()['score']
    
    # Establish mySQL connection to database from connection pool
    connection = database_manager.cnxpool.get_connection()
    cursor = connection.cursor(buffered=True) 

    cursor.execute("SELECT highscore FROM users WHERE username = %s;", (str(username),)) # Execute select statement
    result = cursor.fetchall() # Store result of this statement

    if len(result) > 0:
        if result[0][0] < val :
            # If new score is greater than highscore, update highscore to be new score
            cursor.execute("UPDATE users SET highscore = %s WHERE username = %s;", (str(val), str(username)))
            connection.commit() 

    cursor.execute("SELECT highscore FROM users WHERE username = %s;", (str(username),)) # Get current highscore
    result = cursor.fetchall()  # Store result of this statement

    # Close the connection
    cursor.close()
    connection.close()

    return Response(
        json.dumps(result),
        mimetype='application/json'
    )


# API call for getting all information in the application
# This includes all info points and quiz questions
# Object returned is formatted in such a way as questions are linked to their relevant info points
@app.route('/info', methods=['GET'])
def api_info_points(): 

    # Call the exporter function to download and format all data stored in Google Doc
    #  This data is then returned as a formatted JSON object
    result = exporter.download_file(service, file_id, "text/plain","./")

    return Response(
        json.dumps(result),
        mimetype='application/json'
    )

if __name__ == '__main__':
		# Home 
    app.run('192.168.0.42', '5000' , True, True  )
		# Hotspot 
	#app.run('192.168.43.169', '5000' , True, True  )
		# college using tethered  
    #app.run('192.168.42.162', '5000' , True, True  )
	    # Tethered home
    # app.run('192.168.42.227', '5000' , True, True  )
