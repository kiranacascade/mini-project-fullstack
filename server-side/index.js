const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./models");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send({
//     message: "This is mini Tokopedia API",
//   });
// });

const { authRouters } = require("./routers");
app.use("/auth", authRouters);

app.listen(process.env.PORT, () => {
  // untuk mengsinkronkan apa yg ada di models ke mysql
  //   db.sequelize.sync({ alter: true });
  console.log(`Server is running on port ${process.env.PORT}`);
});
