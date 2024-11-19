import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"; // Database connection file
import "dotenv/config.js";

// Import routes
import adminRouter from "./routes/adminRoute.js";
import useringRoute from "./routes/useringRoute.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import orderitemRouter from "./routes/orderitemRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import paymentRouter from "./routes/paymentRoute.js"; 

// App config
const app = express();
const port = 7000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/users", useringRoute);
app.use("/api/admin", adminRouter);
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/orderitem", orderitemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/payment", paymentRouter); 

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
