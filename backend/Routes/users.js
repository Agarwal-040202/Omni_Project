import express from "express"
import { getUserDetails, UserDetail } from "../Controlers/userControler.js"

const router = express.Router()

// router.get("/test", (req,res)=>{
//     res.send("it works!")
// })

router.post("/userdetail", UserDetail)
router.post("/find/userId", getUserDetails)


export default router
