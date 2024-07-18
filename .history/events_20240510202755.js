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
const server = require('http').createServer();
server.on('request',())
