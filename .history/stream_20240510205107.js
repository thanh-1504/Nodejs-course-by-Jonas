const fs = require('fs')
const server = require('https').createServer();
server.on("request")
fs.readFile('./data.txt',(err,data) => {

})