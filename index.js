import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; 
import "dotenv/config.js";

// Import routes
import foodRouter from "./routes/foodRoute.js";


// App config
const app = express();
const port = 7000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))





app.get("/", (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
