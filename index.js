import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import orderRouter from './routes/orderRoute.js'
import orderitemRouter from './routes/orderitemRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import 'dotenv/config.js'
import { registerUser } from './controllers/useringcontroller.js'
import profileRouter from './routes/profileRoute.js'







// app config
const app = express()
const port = 7000


// middleware
app.use(express.json())
app.use(cors())


// DBConnection
connectDB();


// api endpoints
app.post("/api/users", registerUser);
app.use('/api/users', profileRouter);
// app.use("/api/food", foodRouter)
// app.use("/api/user", userRouter);
// app.use("/api/order",orderRouter)
// app.use("/api/orderitem",orderitemRouter)
// app.use("/api/category",categoryRouter)
// app.use(".api/payment",)

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.listen(port, () => {
  console.log(`Server Is Running @ http://localhost:${port}`)
})


