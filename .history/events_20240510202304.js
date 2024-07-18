const EventEmitter = require('events');
const myEventEmitter = new EventEmitter();

myEventEmitter.on('newSales')
myEventEmitter.emit('newSales');
