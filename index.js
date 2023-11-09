import express from "express";
import userRoutes from "./Routes/users.js"
import authRoutes from "./Routes/auth.js"
import shopkeeper from "./Routes/shopkeeper.js"
import catalogueRoute from "./Routes/catalogue.js"
import pricelistRoute from "./Routes/pricelist.js"

import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express()


//MIDDLEWARES

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())


app.use("/api/catalogue",catalogueRoute)
app.use("/api/pricelist",pricelistRoute)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/shopkeeper", shopkeeper)




app.listen(8000, () => {
    console.log("Api working!")

})