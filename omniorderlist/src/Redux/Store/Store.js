import { configureStore } from "@reduxjs/toolkit"
import userDetails from "../Features/UserDetailsSlice"
import authReducer from "../Slice/authSlice"
import fieldMemberReducer from "../Slice/feildMemberDetailsSlice"
import getFieldMemberDataSlice from "../Slice/getFieldMemberDataSlice"
import shopkeeperDetailsSlice from "../Slice/addNewShopkeeperSlice"
import shopKeeperDataSlice  from "../Slice/getShopkeeperDataSlice"
import updatefieldMemberReducer from "../Slice/updateFieldMemberSlice"


export const store = configureStore({
    reducer: {
        app: userDetails,
        auth:authReducer,
        fieldMemberDetail:fieldMemberReducer,
        getFiledMemberData: getFieldMemberDataSlice,
        updatefieldMember:updatefieldMemberReducer,
        addNewShopkeeper:shopkeeperDetailsSlice,
        getShopKeeperData: shopKeeperDataSlice,
        
    }
})