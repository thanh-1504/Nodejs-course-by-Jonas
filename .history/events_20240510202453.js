const EventEmitter = require("events");
const myEventEmitter = new EventEmitter();
myEventEmitter.on("newSales", () => console.log("there was a new Sales"));
myEventEmitter.on("newSales",(stock) => )
myEventEmitter.emit("newSales",9);
