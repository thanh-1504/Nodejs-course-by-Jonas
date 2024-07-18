const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
  res.end("Hi");
  //   fs.readFile("./data.txt", (err, data) => {
  //     res.end(data);
  //   });
});
server.listen(8000, "localhost", () => console.log("listening at port 8000"));
