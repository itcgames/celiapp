from database_manager import DatabaseManager
import matplotlib.pyplot as plt
import numpy as np

database_manager = DatabaseManager()
settings = {
	'debug':True	#includes autoreload
}

# Function for making a graph to show user visits on each page
def pageVisitGraph() : 
	# Establish mySQL connection to database from connection pool
	connection = database_manager.cnxpool.get_connection()
	cursor = connection.cursor(buffered=True) 

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Start Quiz';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	startQuizAmount = result[0][0] # Assign amount of quiz page visits to variable

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Enter Result Page';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	finishQuizAmount = result[0][0] # Assign amount of result page visits to variable

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Enter Info Page';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	infoAmount = result[0][0] # Assign amount of info page visits to variable

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Enter Personalised Page';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	personalAmount = result[0][0] # Assign amount of personalised info page visits to variable

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Enter Social Hub';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	socialAmount = result[0][0] # Assign amount of result page visits to variable

	cursor.close()
	connection.close()

	# Set up bar chart variables
	objects = ('Quiz', 'Results Page', 'Info Page', 'Personal Page', 'Social Hub')
	y_pos = np.arange(len(objects))
	performance = [startQuizAmount, finishQuizAmount, infoAmount, personalAmount, socialAmount]
	
	# Set up bar chart
	plt.bar(y_pos, performance, align='center', alpha=0.5)
	plt.xticks(y_pos, objects)
	plt.ylabel('Times Page Visited')
	plt.title('Page Visits')
	
	plt.savefig('Graphs/pageVisits.png') # Save bar chart as png
	plt.show() # Display bar chart to screen


# Function for making a graph to show roughly what stage of the quiz users are dropping off at
def quizDropOff() :
	# Establish mySQL connection to database from connection pool
	connection = database_manager.cnxpool.get_connection()
	cursor = connection.cursor(buffered=True) 

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Start Quiz';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	startQuizAmount = result[0][0] # Assign amount of quiz page visits to variable

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Start question 5';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	question5 = result[0][0] # Assign amount of times a user has started question 5 to variable

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Start question 10';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	question10 = result[0][0] # Assign amount of times a user has started question 10 to variable

	cursor.execute("SELECT COUNT(*) FROM userdata WHERE event = 'Enter Result Page';") # Execute select statement
	result = cursor.fetchall() # Store result of this statement

	finishQuizAmount = result[0][0] # Assign amount of result page visits to variable

	cursor.close()
	connection.close()

	# Set up bar chart variables
	objects = ('Start Quiz', 'Question 5', 'Question 10','Finish Quiz')
	y_pos = np.arange(len(objects))
	performance = [startQuizAmount, question5, question10, finishQuizAmount]
	
	# Set up bar chart
	plt.bar(y_pos, performance, align='center', alpha=0.5)
	plt.xticks(y_pos, objects)
	plt.ylabel('Times Page Visited')
	plt.title('Page Visits')
	
	plt.savefig('Graphs/quizDropOff.png') # Save bar chart as png
	plt.show() # Display bar chart to screen


pageVisitGraph()
quizDropOff()