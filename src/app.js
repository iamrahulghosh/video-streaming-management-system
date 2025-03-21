import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))

app.use(cookieParser())

app.use(express.json({
    "limit": "1mb"
}))

app.use(express.urlencoded({
    "limit": "1mb",
    "extended": true
}))

app.use(express.static("public"))



import userRouter from "./routes/user.route.js"

app.use("/api/v1/user", userRouter)

export default app