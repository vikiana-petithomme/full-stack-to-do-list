const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection ;

const url = "mongodb+srv://vikiana:a123b@cluster0.6ozuol9.mongodb.net/taskList?retryWrites=true&w=majority";
const dbName = "taskList";

app.listen(3100, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('tasks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {tasks: result})
  })
})


app.post('/tasks', (req, res) => {
  db.collection('tasks').save({task: req.body.task, dueDate: req.body.dueDate}, (err, result) =>  {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/tasks', (req, res) => {
  db.collection('tasks')
  .findOneAndUpdate({task: req.body.task, dueDate: req.body.dueDate}, {
    $set: {
      task: req.body.task, 
      dueDate: req.body.dueDate
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/trash', (req, res) => {
  db.collection('tasks').findOneAndDelete({task: req.body.task, dueDate: req.body.dueDate}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Task deleted!')
  })
})

