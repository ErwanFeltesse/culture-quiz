const express = require("express");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin.routes");
const quizRoutes = require("./routes/quiz.routes");
const barRoutes = require("./routes/bar.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkAdmin, requireAuth } = require("./middleware/auth.middleware");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();



const corsOptions= {
  origin: process.env.CLIENT_URL,
  credentials : true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkAdmin);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.admin._id);
});

//routes
app.use("/api/admin", adminRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/bar", barRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
