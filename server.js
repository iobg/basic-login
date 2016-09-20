'use strict'
const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const routes = require('./routes/')

const app=express()
app.use(routes)
app.set('view engine',"pug")
app.listen(3000)
