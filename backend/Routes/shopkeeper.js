import express from "express"
import { addShopkeeperDetail, getShopkeeperDetail } from "../Controlers/shopkeeperControler.js"

const router = express.Router()

// router.get("/test", (req,res)=>{
//     res.send("it works!")
// })

router.post("/addshopkeeperdetail", addShopkeeperDetail)
router.get("/getallshopkeeper", getShopkeeperDetail)


export default router
