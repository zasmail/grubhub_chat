
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const Chatkit = require('pusher-chatkit-server')
    const app = express()
    
    // init chatkit
    const chatkit = new Chatkit.default({
      instanceLocator: 'v1:us1:7db04fbc-6070-4c06-bc58-a702f0d72695',
      key: '24460b86-67e4-446d-9d01-0ed796ad9a01:mhhKezpl9SMKm8lrBTHsIPg601OjOGCyE0XsMI4uMxM=',
    })
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cors())
    
    // create users
    app.post('/users', (req, res) => {
      const { username } = req.body
      console.log(username);
      chatkit
        .createUser({ 
        id: username, 
        name: username 
         })
        .then(() => res.sendStatus(201))
        .catch(error => {
          if (error.error_type === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
          } else {
            res.status(error.status).json(error)
          }
        })
    })
    const PORT = 3001
    app.listen(PORT, err => {
      if (err) {
        console.error(err)
      } else {
        console.log(`Running on port ${PORT}`)
      }
    })
