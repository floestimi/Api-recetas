const express = require("express");
const jwt = require("jsonwebtoken");
const key = "mi-clave-secreta";

const app = express();
const port = 3000;
const route = require("./routes/route");
const login = require("./routes/login");

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();

});

app.use("/recipe", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], key);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido al recetario</h1>");
});

app.use("/recipe", route);
app.use("/login", login);

app.listen(port, () => {
  console.log(`Bienvenido al recetario, puede encontrarlo en el puerto ` + port);
});
