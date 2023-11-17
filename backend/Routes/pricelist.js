import express from "express"
import {getPriceList1Detail,getPriceList2Detail,getPriceList3Detail} from "../Controlers/omniPriceList1.js"

const router = express.Router()


router.get("/pricelist1", getPriceList1Detail)
router.get("/pricelist2", getPriceList2Detail)
router.get("/pricelist3", getPriceList3Detail)




export default router
