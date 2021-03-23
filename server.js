const express = require("express");
const adminRoutes = require('./routes/admin.routes');
require("dotenv").config({ path: "./config/.env" });
require("./config/db")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//routes
app.use('/api/admin', adminRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
