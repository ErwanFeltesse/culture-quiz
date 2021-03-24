const express = require("express");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkAdmin, requireAuth } = require("./middleware/auth.middleware");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkAdmin);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.admin._id)
});

//routes
app.use("/api/admin", adminRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
