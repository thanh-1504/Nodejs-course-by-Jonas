const EventEmitter = require('events');
const myEventEmitter = new EventEmitter();

myEventEmitter.on('newSales',() => console.log("newSales"))
myEventEmitter.emit('newSales');
