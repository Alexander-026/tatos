import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./config/connectDB"
import userRoutes from "./routes/user.routes"
import companyRoutes from "./routes/company.routes"
import errorHandler from "./exceptions/errorHandler"
import errorMiddleware from "./middlewares/errorMiddleware"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN || ""],
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())

app.use("/api/user", userRoutes)
app.use("/api/company", companyRoutes)

app.use(errorMiddleware)


app.use(errorHandler)

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server is running on http://localhost:${PORT}`)
})
