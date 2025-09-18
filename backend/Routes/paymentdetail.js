import express from "express"

import { addPaymentDetail,getPaymentDetail,updatePaymentDetail } from "../Controlers/paymentDetailControler.js"

const router = express.Router()

router.post("/addPaymentDetail", addPaymentDetail)
router.get("/getallpaymentdetail/userId", getPaymentDetail)
router.put("/update/reportId", updatePaymentDetail)



export default router
