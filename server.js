'use strict'
const express = require('express')
const session = require('express-session')
const bodyParser= require('body-parser')
const RedisStore = require('connect-redis')(session)
const routes = require('./routes/')
const connect =require('./database').connect

const app=express()

app.set('view engine',"pug")
const port = process.env.PORT || 3000
app.set('port', port)

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  store:new RedisStore({
  	url:process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret:'supersecretcode'
}))
app.use((req,res,next)=>{
    app.locals.email=req.session.email
    next()
})
app.use(routes)



//connecting
connect().then(()=>{
  app.listen(port, () =>{
     console.log(`Listening on port: ${port}`)
  }
)
}).catch(console.error)
