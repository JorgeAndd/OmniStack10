## Running Mongo locally on Windows

 0. Create a folder for your Mongo server files
 1. Navigate to the bin folder where Mongo is installed
   `cd E:\MongoDB\Server\4.2\bin\`
 2. Run mongod pointing to the folder you created
   `.\mongod.exe --dbpath "E:\MongoDB\data\"`
	Make sure you get a message that Mongo is running:
	**NETWORK  [initandlisten] waiting for connections on port xxx**
3. Open another terminal and navigate to the same bin folder as before
4. Run mongo 
    `.\mongo.exe`


