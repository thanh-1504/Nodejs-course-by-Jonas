const server = require("http").createServer();
server.on("request", () => {
  console.log("server is running");
});
server.listen(8000);
