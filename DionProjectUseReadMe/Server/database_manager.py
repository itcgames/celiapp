from mysql.connector.pooling import MySQLConnectionPool
from mysql.connector import errorcode
import time
import traceback

# Our database manager class, this creates a pool of connections 
# It also allows for api calls to user one of these connections for it SQL statements
# This allows for multiple SQL statements to execute concurrently
class DatabaseManager:

	# Initialise function for setting up database manager
	def __init__(self):
		# Calls the create connection pool function so that connection pool
		# exists as soon as database manager object is created
		self.createConnectionPool()	
		
	# Function for creating a pool of database connections
	def createConnectionPool(self):

		# The configuration values necessary to connect to the desired database
		dbconfig = {
		"user": "root",
		"password":"ePBsjLQV",
		"database":'desapi'
		}

		try:
			# Creates a pool of connections, the size of this pool is 32
			self.cnxpool = MySQLConnectionPool(
														pool_name = "mypool",
														pool_size = 32,
														**dbconfig)
		except:
			# sleep and retry - the MySQL container probably not up and running yet
			print("Exception... sleeping for 5 seconds then retry")
			tb = traceback.format_exc()
			print(tb)
			time.sleep(5)
			# try again
			return self.createConnectionPool()