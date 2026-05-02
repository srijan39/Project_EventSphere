import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import recruitmentRoutes from "./routes/recruitmentRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB error:", error.message));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/recruitment", recruitmentRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});