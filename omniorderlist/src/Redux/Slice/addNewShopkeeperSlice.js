import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"



//add new field member
const initialState = {
    shopkeeperDetailStatus: "",
    shopkeeperDetailError: "",
    shopkeeperDetailLoaded: false
};

export const shopkeeperDetails = createAsyncThunk(
    "shopkeeperDetails",
    async (shopkeeperData, { rejectWithValue }) => {
        console.log("shopkeeperData", shopkeeperData);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/shopkeeper/addshopkeeperdetail",
                shopkeeperData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const shopkeeperRecored = response.data;
            console.log("shopkeeperRecored", shopkeeperRecored)

            // localStorage.setItem("filedMemberRecored", JSON.stringify(filedMemberRecored));

            return shopkeeperRecored;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);


const shopkeeperDetailsSlice = createSlice({
    name: "shopkeeperDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(shopkeeperDetails.pending, (state, action) => {
            return { ...state, shopkeeperDetailStatus: "pending", shopkeeperDetailLoaded: true }
        })
        builder.addCase(shopkeeperDetails.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    shopkeeperDetailLoaded: false,
                    shopkeeperRecored: action.payload,
                    shopkeeperDetailStatus: "Success",

                }
            }
            else {
                return state
            }
        })
        builder.addCase(shopkeeperDetails.rejected, (state, action) => {
            return {
                ...state,
                shopkeeperDetailStatus: "rejected",
                shopkeeperDetailError: action.payload
            }
        })



    }
})




export default shopkeeperDetailsSlice.reducer;


