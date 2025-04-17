// import express from "express";
// import userRoutes from "./Routes/users.js"
// import authRoutes from "./Routes/auth.js"
// import shopkeeper from "./Routes/shopkeeper.js"
// import catalogueRoute from "./Routes/catalogue.js"
// import pricelistRoute from "./Routes/pricelist.js"

// import cors from "cors"
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";

// const app = express()
  
// app.use(cors())
// app.use(express.json())
// app.use(cookieParser())
// app.use(bodyParser.json())


// app.use("/api/catalogue",catalogueRoute)
// app.use("/api/pricelist",pricelistRoute)
// app.use("/api/users", userRoutes)
// app.use("/api/auth", authRoutes)
// app.use("/api/shopkeeper", shopkeeper)


// const port = process.env.PORT || 8000

// app.listen(port, () => {
//     console.log("Api working!")

// })


import express from "express";
import userRoutes from "./Routes/users.js"
import authRoutes from "./Routes/auth.js"
import shopkeeper from "./Routes/shopkeeper.js"
import catalogueRoute from "./Routes/catalogue.js"
import pricelistRoute from "./Routes/pricelist.js"
import orderlist from "./Routes/orderlist.js"
import reportlist from "./Routes/reportlist.js"

import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express()
const router = express.Router()
router.options('/',cors())

//MIDDLEWARES


  
app.use(cors({
    origin : '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())


app.use("/api/catalogue",catalogueRoute)
app.use("/api/pricelist",pricelistRoute)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/shopkeeper", shopkeeper)
app.use("/api/orderlist", orderlist)
app.use("/api/reportlist", reportlist)



const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("Api working!")

})





