import express from "express"
import { admincode, logincode, fieldmemberlogin, register, logout } from "../Controlers/authControler.js"

const router = express.Router()


// router.get("/find/:userId", getUser)

router.post("/find/logincode", logincode)
router.post("/find/admincode", admincode)
router.post("/fieldmemberlogin", fieldmemberlogin)
router.post("/register", register)
router.post("/logout", logout)



export default router
