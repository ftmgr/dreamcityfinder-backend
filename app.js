require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");
const path = require("path");

const server = jsonServer.create();

const router = jsonServer.router("cities.json");

const middlewares = jsonServer.defaults();
const PORT = process.env.PORT;

const USERS_FILE_PATH = path.join(__dirname, "cities.json");

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

router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Read users from the JSON file
    const data = JSON.parse(fs.readFileSync(USERS_FILE_PATH, "utf8"));
    // Check if the email already exists
    const usersData = data.users;
    const existingUser = usersData.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Add the new user to the array
    const newUser = { name, email, password };
    usersData.push(newUser);
    // Write updated users data back to the JSON file
    fs.writeFileSync(
      USERS_FILE_PATH,
      JSON.stringify(usersData, null, 2),
      "utf8"
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
