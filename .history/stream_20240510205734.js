const fs = require("fs");
const server = require("http").createServer();
server.on("request", (req, res) => {
  // solution 1
  //   fs.readFile("./data.txt", (err, data) => {
  //     res.end(data);
  //   });
  // solution 2
  const readble = fs.createReadStream("./data.txt");
  
});
server.listen(8000, "localhost", () => console.log("listening at port 8000"));
