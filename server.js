require("dotenv").config();
const http = require("http");
const app = require("./src/app/app");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Listening on port" + " " + port);
});
