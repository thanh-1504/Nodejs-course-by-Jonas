const EventEmitter = require("events");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEventEmitter = new Sales();
myEventEmitter.on("newSales", () => console.log("there was a new Sales"));
myEventEmitter.on("newSales", (stock) =>
  console.log(`there are now ${stock} items`)
);
myEventEmitter.emit("newSales", 9);
const server = require("http").createServer();
server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request received");
});
server.on('request')
server.listen(8000, "localhost", () => {
  console.log("server is listening at port 8000");
});
server.on("close", () => console.log("Server closed"));
