require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");

const server = jsonServer.create();

const router = jsonServer.router("cities.json");

const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

//const USERS_FILE_PATH = path.join(__dirname, "cities.json");

server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
