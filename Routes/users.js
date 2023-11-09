import express from "express"
import { getUserDetails, UserDetail, updateUserDetail } from "../Controlers/userControler.js"

const router = express.Router()

// router.get("/test", (req,res)=>{
//     res.send("it works!")
// })

router.post("/userdetail", UserDetail)
router.post("/find/userId", getUserDetails)
router.put("/update/userId", updateUserDetail)



export default router
