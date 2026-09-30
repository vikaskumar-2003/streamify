import dotenv from "dotenv"
dotenv.config({
    quiet:true
})


import express from "express"
import auth_routes from "./routes/auth.routes.js"
import { dbConnect } from "./lib/databse.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import chatRoute from "./routes/chat.routes.js"
import cors from "cors"

const app=express()

const PORT=process.env.PORT||9000


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth",auth_routes)
app.use("/api/users",userRoute)
app.use("/api/chat",chatRoute)


app.listen(PORT,()=>{
  
    console.log("server is sarted");
      dbConnect()
})