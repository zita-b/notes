//node and deno, deno supports typescript
//node is a runtime, runs on servers, has a lot more permissions and access than javascript in the browser. like it can download and install files on the computer
//javascript in the browser runs in sandbox mode (restricted permissions for security, like it cant just go upload random files on your computer unless you give it permission)
//plus in node you can listen to ports, see other running applications etc
//in node you can use COMMON JS SYNTAX OR ES6 SYNTAX


//inside utils.js
module.exports.a = 'a';
exports.a = 'a';

const utils = require('./utils')//import a file from your local file system
utils.a //=> 'a'

const fs = require('fs')//import a module BUNDLED WITH NODE (built in i guess)
//REQUIRE IS COMMON JS SYNTAX

module.exports//supports OBJECTS as well, exports OVERWRITES OBJECTS because it is pointing to =>
module.exports
//but exports is shorter i guess thats why its used sometimes

//DESTRUCTURING IS ES6 SYNTAX
const { a } = require('./utils')
console.log(a)


//FILE SYSTEM MODULE IN NODE.JS

//util.js
const fs = require('fs')

function createFile(name, contents) {
  fs.writeFileSync(name, contents)//sync
  console.log('file written')
} //this will create a file in our local directory because first argument is the PATH

//FS has 2 types of functions SYNC and ASYNC
fs.writeFile//async

module.exports = {
  createFile
}

//index.js
const { createFile } = require('./util')//we dont need .js

createFile('test.txt', 'Hello, World!');

fs.readdirSync('.'); //=> reads the directory's files

const _fs = require('fs')
const fs = _fs.promises
;(async () => {
  await fs.readdir('.')
})();//this is the SAME THING AS READDIRSYNC NOW because you can access promises on fs module

//there are a lot of fs methods, you can read about them in the documentation

fs.readFileSync('index.js', 'utf8')//it can read itself
//specify encoding as second parameter to convert buffer data to string


//ECMAScript Modules

//NEW SYNTAX (ES6?)
import fs from 'fs' //error only cuz i already declared fs
//but you can only use import in MJS FILES (whatever.mjs)
//+ make sure your node version is above 14

//ES6 MODULE SYSTEM

//module.mjs
function square(num) {
  return num ** 2
}

function internal__cube(num) {
  return num ** 3
}

export default square //export is a keyword here, this is the es6 syntax of importing exporting
//you can only have ONE DEFAULT EXPORT per module

//es6.mjs
import square from './module.mjs'

//if you wanna export multiple things:
export {
  square,
  internal__cube as cube
}

//OR
export function square(num) {
  return num ** 2
}

export function cube(num) {
  return num ** 3
}

//es6.mjs
import { square, cube } from './module.mjs'

//OR
import * as util from './module.mjs'
//if you have a lot of imports you can just import all instead of listing them
console.log(util.cube(100))

//you can rename imports too:
import { cube as cubeNumber } from './module.mjs'

console.log(cubeNumber)

//you can export a file from ANOTHER file, like so:
//module.mjs
export function power4(num) {
  return num ** 4
}

export { square__ as square } from './module2.mjs'//(just another file with a function or variable or whatever named square__ )

export * as m2 from './module2.mjs'//this works too, then you import it from another file, in module2 you still have to export
import { m2 } from './module.mjs'

//btw if you are using export default:
export default 'my name' //you can just straight give it a VALUE, then you can import it still cuz its the default
import name from './module.mjs' //no curly braces needed with default export and you can name it anything

import name, { m2 } from './module.mjs' //this works too, importing a default and then regular exports from the same file
import { inherits } from 'util';

export const x = 5
export default 5 //difference


//SERVER IN NODE.JS

//some common node modules: os, fs, path, url, http

//HTTP MODULE
const http = require('http')

http.createServer() //this means we want to OPEN A SPECIFIC PORT FOR LISTENING(for requests)
//once CONNECTION IS ESTABLISHED with the server, you can do 2 things:
http.createServer((req, res) => { //1. listen to the REQUEST, 2. set up a RESPONSE

})

http.createServer((req, res) => {
  res.write('Hello client over there!')
  res.end() //end response
})

//ONCE WE HAVE THE SERVER SET UP
const server = http.createServer((req, res) => {
  res.write('Hello client over there!')
  res.end()
})

server.listen()//specify WHICH PORT YOU WANT TO LISTEN TO

server.listen(process.env.PUBLIC_PORT, () => {//this process.env.PUBLIC_PORT is just for the CODEDAMN PLAYGROUND
  console.log('Hey! We are ready to take requests!')//and a callback function i guess
})

const http = require('http')

const server = http.createServer((_, res) => {
  res.writeHead(418, {'Content-Type': 'text/html'}) //route '/' should return a status code of 418 and the text YOLO
  res.write('YOLO')
  res.end()
})

server.listen(process.env.PUBLIC_PORT)

//and then run the file node server.js or whatever its called
//INSTEAD OF THE HTTP MODULE WE WILL BE USING LIBRARIES SUCH AS EXPRESS TO CREATE SERVERS


//INTRODUCTION TO EXPRESS
//express is a framework / library

npm init
npm i express
//now we can use the express module
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/something', (req, res) => {
  res.send('Hey! Something\'s here')
})

app.post('/something', (req, res) => {
  res.send('This is usually not visible')
})

await fetch('/something', {
  method: 'POST'
}).then(res => res.text()) //=> This is usually not visible

app.listen(process.env.PUBLIC_PORT)

path //internal node module

//send back a static file:
const express = require('express')
const path = require('path')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'public/index.html')
  ) //=> send back index.html when someone requests home page with get
})

//static assets
app.use('/static', express.static(path.resolve(__dirname, 'public'))) //i dont understand this at all

//receiving data from frontend
//you have a form on the frontend, and want to receive the data on the backend when user clicks submit
app.use('/', express.static(path.resolve(__dirname, 'public')))//this is to serve the static files like index.html and css i dont fucking know (inside the public folder in the same directory)

npm i body-parser

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/data', (req, res) => { //define a new route for the incoming data from the form
  console.log(req.body) //and here you can see the username and password
  res.json({ status: 'ok' })
})

//script.js
document.getElementById('submit').onclick = () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username, password
    })
  }).then(res => res.json()).then(data => {
    console.log(data)
  })
}


//Middleware in express

//Middleware functions are functions that have access to the request object, the response object and the next middleware function
//in the application's request-response cycle
//if the current middleware function does not end the request-response cycle, it must call next() to pass control to
//the next middleware function
//app.use() or app.METHOD()

const express = require ('express')
const app = express()

app.use(function (req, res, next) { //application level middleware
  console.log('Time:', Date.now())
  next()
})//a middleware function with no mount path (it will be executed every time the app receives a request)

app.use('/user/:id', function (req, res, next) { //a middleware function mounted on the /user/:id path, the function will be executed for any type of HTTP request on the /user/:id path
  console.log('Request Type:', req.method)
  next()
})

//router level middleware:
const router = express.Router()

//router.use or router.METHOD() functions
router.use(function (req, res, next) { //a middleware function with no moint path, executed for every request to the router
  console.log('Time:', Date.now())
  next()
})