const EventEmitter = require("events");
const myEventEmitter = new EventEmitter();
class Sales extends EventEmitter
myEventEmitter.on("newSales", () => console.log("there was a new Sales"));
myEventEmitter.on("newSales", (stock) =>
  console.log(`there are now ${stock} items`)
);
myEventEmitter.emit("newSales", 9);
