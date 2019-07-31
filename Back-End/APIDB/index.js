const express = require('express')
const bodyParser = require('body-parser')
const { Agent, Intents, Entities, Context, KnowledgeBase, Document} = require('./sequelize.js')

const app = express()
app.use(bodyParser.json())


//agents
app.post('/api/Agent', (req, res) => {
    console.log(req.body)
    Agent.create(req.body)
        .then(user => res.json(user))
})

app.get('/api/Agent', (req, res) => {
    Agent.findAll().then(users => res.json(users))
})
//intents 
app.post('/api/Intent', (req, res) => {
    console.log(req.body)
    Intents.create(req.body)
        .then(user => res.json(user))
})

app.get('/api/Intent', (req, res) => {
    Intents.findAll().then(users => res.json(users))
})

//entities 
app.post('/api/Entities', (req, res) => {
    console.log(req.body)
    Entities.create(req.body)
        .then(user => res.json(user))
})

app.get('/api/Entities', (req, res) => {
    Entities.findAll().then(users => res.json(users))
})

//context
app.post('/api/Context', (req, res) => {
    console.log(req.body)
    Context.create(req.body)
        .then(user => res.json(user))
})

app.get('/api/Context', (req, res) => {
    Context.findAll().then(users => res.json(users))
})


//KnowledgeBase
app.post('/api/KnowledgeBase', (req, res) => {
    console.log(req.body)
    KnowledgeBase.create(req.body)
        .then(user => res.json(user))
})

app.get('/api/KnowledgeBase', (req, res) => {
    KnowledgeBase.findAll().then(users => res.json(users))
})

// app.post('/api/create',(req,res)=>{
//     Admin.create(req.body)
//     .then(result=>res.json(result));
  
//   })
const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})