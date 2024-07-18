const fs = require("fs");
const server = require("https").createServer();
server.on("request", (req, res) => {
  fs.readFile("./data.txt", (err, data) => {});
});
server.listen()
