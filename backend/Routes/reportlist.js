import express from "express"

import { addReportListDetail,getReportListDetail,updateReportDetail } from "../Controlers/reportListControler.js"

const router = express.Router()

router.post("/addreportlistdetail", addReportListDetail)
router.get("/getallreportlist/userId", getReportListDetail)
router.put("/update/reportId", updateReportDetail)



export default router
