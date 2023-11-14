import express from "express"
import { createCatalogues } from "../Controlers/omniCatalogue.js"

const router = express.Router()

// router.get("/test", (req,res)=>{
//     res.send("it works!")
// })

router.post("/insertcatalogue", createCatalogues)


// router.post("/find/userId", getUserDetails)
// router.put("/update/userId", updateUserDetail) new code push 14-11-23



export default router
