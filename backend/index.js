import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config()
import cors from 'cors'

const port=process.env.PORT || 5000;

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use("/api/auth", authRouter)

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running at ${port}`)
})