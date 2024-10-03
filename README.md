Setup MogoDB 
mogodb => "C:\Program Files\MongoDB\Server\5.0\bin/mongod.exe" --version       
mongoEXE => "C:\Program Files\MongoDB\Server\5.0\bin/mongo.exe" --version          


########## for terminal for powershell#######################################
 mongo "mongodb+srv://studentsdemo.y2jgxd7.mongodb.net/studentsapi" --username santosh123

####################### CLUSTERDB#######################

CLUSTER_DB = "mongodb+srv://test123:pal123@$cluster0.bjxrmbt.mongodb.net/demodb?retryWrites=true&w=majority"
SECRET_KEY ="YOURjhfdhkghkdfghkhdghkhSECURITY_KEY"

 mongodb+srv://santosh123:pal123@demodb.wa1hik2.mongodb.net/demodb

 mongodb+srv://test123:*****@cluster0.bjxrmbt.mongodb.net/demodb

Intialize DB  => mongo
Database show => show dbs
view Collection =>  show collections
current Db show  => db

// Create & Used Database  => use DatabaseName
Ex:1 use students-api

Delete Collection & db
syntax: db.colleCtionName.drop()
Ex1 : db.registers.drop()

$$$$$$$$$$$$$$$$$$$$$$$$ -CRUD Querry -$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

######################################--Create--########################################################  

 #Create Collection => 

// a) InsertOne:-  Single Data Create.
db.DocumentName.insertOne() 
Ex1 :db.registers.insertOne({name:"santosh" ,mobile:5445445646, email:"demo@gmail.com"})

// a) InsertMany:- Multiple  Data Create.
db.DocumentName.InsertMany([{},{},{}]) 
Ex1 :db.registers.insertMany([
    {name:"Ravi" ,mobile:8445445649, email:"ravi123@gmail.com"},
    {name:"Raj" ,mobile:4545445610, email:"raj13@gmail.com"},
    {name:"Ram" ,mobile:655445612, email:"ram456@gmail.com"},
    {name:"Aman" ,mobile:8545445645, email:"aman789@gmail.com"},
    ])

 Ex2:  db.crudData.insertMany([
    {name:"Ravi" ,mobile:8445445649, email:"ravi123@gmail.com"},
    {name:"Raj" ,mobile:4545445610, email:"raj13@gmail.com"},
    {name:"Ram" ,mobile:655445612, email:"ram456@gmail.com"},
    {name:"Aman" ,mobile:8545445645, email:"aman789@gmail.com"},
    ])

######################################--Read--########################################################  

Syntax : db.collection.find(query, projection)  '#projection is 0 set not show any collection#'

1) All fields for db.
Show Documents data => db.DocumentName.find().pretty()
Ex:1 db.registers.find().pretty()
Ex:2 db.students.find().pretty()

2) Find Praticular for only one fields.
Ex1: db.crudData.find({name:"Ram"}).pretty()

3) Find Praticular Fileds for only one  fields for withought id show in collection
 db.crudData.find({name:"Ram"},{ _id:0,name:1})   

4) Limit show Collection Data.
 Ex1 : (a). Limit  db.crudData.find({name:"Ram"},{ _id:0,name:1}) .limit(1) 
 Ex2 : (b). skip  db.crudData.find({name:"Ram"},{ _id:0,name:1}) .skip(1)  
 Ex3 : (c). findOne  db.crudData.findOne({name:"Ram"},{ _id:0,name:1}) 


######################################--UPDATE--########################################################  

Syntax :
1)updateOne()
(a). db.colleCtionName.updateOne(<filter>, <updatefileds>)  
Ex:1 db.crudData.updateOne({name:"Aman"},{$set:{email:"amar@gmail.com"}})

2)updateMany()
(b). db.colleCtionName.updateMany(<filter>, <updatefileds>)  
Ex-2 db.crudData.updateMany({name:"sani"},{$set:{email:"bobby@gmail.com"}})


######################################--DELETE--########################################################  

Syntax :
1)deleteOne()
(a). db.colleCtionName.deleteOne(<filter>, <updatefileds>)  
Ex1. db.crudData.deleteOne({name:"raj"})


2)deleteMany()
(b). db.colleCtionName.deleteMany(<filter>, <updatefileds>)  
Ex2. db.crudData.deleteMany({name:"sani"})
(c). all collection Delete
Ex3. db.crudData.deleteMany({})








