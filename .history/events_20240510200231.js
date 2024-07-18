const server = require("http").createServer();
server.on("request", (res) => {
  console.log("server is running");
});
server.listen(8000, () => console.log("listening at port 8000"));
