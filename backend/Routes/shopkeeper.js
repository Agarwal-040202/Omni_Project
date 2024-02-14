import express from "express"
import { addShopkeeperDetail, getShopkeeperDetail,updateShopkeeperDetail } from "../Controlers/shopkeeperControler.js"

const router = express.Router()

// router.get("/test", (req,res)=>{
//     res.send("it works!")
// })
console.log("updateShopkeeperDetail",updateShopkeeperDetail)

router.post("/addshopkeeperdetail", addShopkeeperDetail)
router.get("/getallshopkeeper", getShopkeeperDetail)
router.put("/update/shopkeeperId", updateShopkeeperDetail)




export default router
