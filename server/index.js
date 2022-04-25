let catJson = require('./data/catData.json');
let dogJson = require('./data/dogData.json');
const express = require('express')
const server = express()
var cors = require('cors')
const parser = require('body-parser')

server.use(express.json())
server.use(cors())
server.use(parser.json())
server.use(parser.urlencoded({
  extended: true
}));

const editPet = (id, jsonObj, newInfo) => {
  for (var i = 0; i < jsonObj.length; i++) {
    if (jsonObj[i].id === id) {
      jsonObj[i] = newInfo;
      return;
    }
  }
}

server.get('/cats', (req, res) => {
  res.send(JSON.stringify(catJson))
})

server.put('/cat/:id', (req, res) => {
  console.log(req.params.id, req.body)
  editPet(req.params.id, catJson, req.body)
  
  res.send(JSON.stringify(catJson))
  
 
})

server.get('/dogs', (req, res) => {
  res.send(JSON.stringify(dogJson))
})

server.put('/dog/:id', (req, res) => {
  editPet(req.params.id, dogJson, req.body)
  res.send(JSON.stringify(dogJson))
})

server.listen(3000, (err) => {
  if (err) throw err;
  console.log('server is listening on port 3000');
})
