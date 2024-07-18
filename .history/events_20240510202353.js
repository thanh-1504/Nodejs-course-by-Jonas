const EventEmitter = require("events");
const myEventEmitter = new EventEmitter();
myEventEmitter.emit("newSales");
myEventEmitter.on("newSales", () => console.log("there was a new Sales"));
