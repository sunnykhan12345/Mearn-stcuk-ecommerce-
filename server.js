import express from "express";
import env from "dotenv";
env.config();
const app = express();
import morgan from "morgan";
import connectDB from "./config/db.js";
import router from "./routes/authRoute.js";
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(morgan("dev"));
connectDB();
app.get("/", (req, res) => {
  res.send("<h1>Hi, how are you Node?</h1>");
});
// for api
// app.use("/api",router)
app.use("/api/v1/auth", router);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
