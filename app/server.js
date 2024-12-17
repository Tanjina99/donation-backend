const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./db/connection");
const userRoutes = require("./router/userRouter");
const donationRoutes = require("./router/donationRouter");
const fundRaisingRoutes = require("./router/fundRaisingRouter");
const fundRaisingTransactionRoutes = require("./router/fundRaisingTransactionRouter");
const donationTransactionRoutes = require("./router/donationTransactionRouter");
const combineTransactionRoutes = require("./router/combineRouter");
const port = 5000;

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

dbConnection();

app.use("/api", userRoutes);
app.use("/api", donationRoutes);
app.use("/api", fundRaisingRoutes);
app.use("/api", fundRaisingTransactionRoutes);
app.use("/api", donationTransactionRoutes);
app.use("/api", combineTransactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
