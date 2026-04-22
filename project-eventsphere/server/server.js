import "dotenv/config";
import express from "express";
import cors from "cors";
import recruitmentRoutes from "./routes/recruitmentRoutes.js";

console.log("ENV email loaded:", !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log("ENV key loaded:", !!process.env.GOOGLE_PRIVATE_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/recruitment", recruitmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});