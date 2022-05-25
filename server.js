const express = require("express")
const apiRoute = require("./routes/apiRoute")
const connectDB = require("./utils/database")
const logger = require("./utils/logger")
const cookieParser = require("cookie-parser")
require("dotenv/config")

const app = express()
const PORT = process.env.PORT || 5000
connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)

app.use("/api", apiRoute)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))