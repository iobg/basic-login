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
  store:new RedisStore(),
  secret:'heyitsmeurbrother'
}))
app.use(routes)

app.use((req,res,next)=>{
    app.locals.email=req.session.email
    next()
})


//connecting
connect().then(()=>{
  app.listen(port, () =>{
     console.log(`Listening on port: ${port}`)
  }
)
}).catch(console.error)
