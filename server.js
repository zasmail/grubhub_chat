
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const Chatkit = require('pusher-chatkit-server')
    const app = express()
    
    // init chatkit
    const chatkit = new Chatkit.default({
      instanceLocator: 'v1:us1:2021ca78-70ca-4b97-a4e9-cdf2217f1294',
      key: '83f88fcd-3cb5-4e37-8ece-be5a098b6e6a:zOTecZxZ0TM7DLJF2f+q1gJKefkXDRbrahnxvqRsvQk=',
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
