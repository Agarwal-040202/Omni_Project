import express from "express"
import { addOrderListDetail,getOrderListDetail,updateOrderDetail  } from "../Controlers/orderListControler.js"

const router = express.Router()

router.post("/addorderlistdetail", addOrderListDetail)
router.get("/getallorderlist/userId", getOrderListDetail)
router.put("/update/orderId", updateOrderDetail)



export default router
