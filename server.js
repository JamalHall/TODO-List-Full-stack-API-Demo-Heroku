const PORT = process.env.PORT || 8000
const express = require('express')
const app = express()
//const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

////EJS Setup////
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

////DB connection////
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://JH:tml0fuCYdqmSBpM6@cluster0.e0axb.mongodb.net/todoList?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 
////POST////
    
        app.post('/updateList', (request, response) => {
            db.collection('listItems').insertOne({taskItem: request.body.taskItem||'empty', date: request.body.date||'empty', status: false})
            .then(result => {
                console.log('Task Added')
                response.redirect('/')
            })
            .catch(error => console.error(error))
        })
    

////GET////
        app.get('/',(request, response)=>{
            db.collection('listItems').find().toArray()
            .then(data => {
             //console.log(data) //uncomment to see data
                response.render('index.ejs', { info: data })
    // data from the render is passed into info variable (you can use any word)
     
            })
            .catch(error => console.error(error))
        })  
    
////PUT////

app.put('/taskStatus', (request, response) => {
    console.log(request.body)
    db.collection('listItems').updateOne({taskItem: request.body.TaskID},{$set: {status: request.body.IStatus }})

    .then(result => {
        console.log('task updated log')
        response.json('task updated response')

    })
    .catch(error => console.error(error))
 
})



////DELETE////
app.delete('/deleteTask', (request, response) => {
    db.collection('listItems').deleteOne({taskItem: request.body.TaskDel||null}) 
    .then(result => {
        console.log('Task Deleted')
        response.json('Task Deleted')
    })
    .catch(error => console.error(error))

})


//// Listen method ////
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
        })
