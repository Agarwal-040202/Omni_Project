import { configureStore } from "@reduxjs/toolkit"
import userDetails from "../Features/UserDetailsSlice"
import authReducer from "../Slice/authSlice"
import fieldMemberReducer from "../Slice/feildMemberDetailsSlice"
import getFieldMemberDataSlice from "../Slice/getFieldMemberDataSlice"
import shopkeeperDetailsSlice from "../Slice/addNewShopkeeperSlice"
import shopKeeperDataSlice  from "../Slice/getShopkeeperDataSlice"


export const store = configureStore({
    reducer: {
        app: userDetails,
        auth:authReducer,
        fieldMemberDetail:fieldMemberReducer,
        getFiledMemberData: getFieldMemberDataSlice,
        getShopKeeperData: shopKeeperDataSlice,
        
    }
})