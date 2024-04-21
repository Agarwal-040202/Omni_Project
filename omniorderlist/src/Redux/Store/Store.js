import { configureStore } from "@reduxjs/toolkit"
import userDetails from "../Features/UserDetailsSlice"
import authReducer from "../Slice/authSlice"
import fieldMemberReducer from "../Slice/feildMemberDetailsSlice"
import getFieldMemberDataSlice from "../Slice/getFieldMemberDataSlice"
import shopkeeperDetailsSlice from "../Slice/addNewShopkeeperSlice"
import shopKeeperDataSlice  from "../Slice/getShopkeeperDataSlice"
import updatefieldMemberReducer from "../Slice/updateFieldMemberSlice"
import updateshopkeeperReducer from "../Slice/shopkeeperSlice/updateShopkeeperSlice"
import insertCatelogueData from "../Slice/catelogueSlice/catelogueSlice"
import priceListDataSlice  from "../Slice/priceLisleSlice/priceListSlice"
import orderListDetailsSlice from "../Slice/orderListSlice/orderListSaveSlice"
import orderlistDataSlice from "../Slice/orderListSlice/getOderlistDataSlice"
import updateOrderListDataSlice from "../Slice/orderListSlice/orderListEditSlice"


export const store = configureStore({
    reducer: {
        app: userDetails,
        auth:authReducer,
        fieldMemberDetail:fieldMemberReducer,
        getFiledMemberData: getFieldMemberDataSlice,
        updatefieldMember:updatefieldMemberReducer,
        addNewShopkeeper:shopkeeperDetailsSlice,
        getShopKeeperData: shopKeeperDataSlice,
        updateshopkeeperData:updateshopkeeperReducer,
        catelougeData:insertCatelogueData,
        priceListData: priceListDataSlice,
        addNewOrderData:orderListDetailsSlice,
        getALLOrderListData:orderlistDataSlice,
        updateOrderList:updateOrderListDataSlice

    }
})