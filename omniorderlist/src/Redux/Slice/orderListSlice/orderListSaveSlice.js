import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { orderListDetailURL } = OmniUrl;

const initialState = {
    orderListDetailStatus: null,
    orderListDetailError: null,
    orderListDetailLoaded: false,
    orderListRecord: null // Corrected variable name
};

export const orderListDetails = createAsyncThunk(
    "orderListDetails",
    async (orderListData, { rejectWithValue }) => {
        console.log("orderListData", orderListData);
        try {
            const response = await axios.post(
                orderListDetailURL,
                orderListData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const orderListRecord = response.data;
            console.log("orderListRecord", orderListRecord)

            // localStorage.setItem("filedMemberRecord", JSON.stringify(filedMemberRecord));

            return orderListRecord;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

const orderListDetailsSlice = createSlice({
    name: "orderListDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(orderListDetails.pending, (state, action) => {
            return { ...state, orderListDetailStatus: "pending", orderListDetailLoaded: true }
        })
        builder.addCase(orderListDetails.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    orderListDetailLoaded: false,
                    orderListRecord: action.payload,
                    orderListDetailStatus: "Success",
                }
            }
            else {
                return state
            }
        })
        builder.addCase(orderListDetails.rejected, (state, action) => {
            return {
                ...state,
                orderListDetailStatus: "rejected",
                orderListDetailError: action.payload
            }
        })
    }
})

export default orderListDetailsSlice.reducer;
