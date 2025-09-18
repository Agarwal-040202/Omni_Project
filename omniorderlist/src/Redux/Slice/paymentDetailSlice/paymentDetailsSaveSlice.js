import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { paymentDetailSaveURL } = OmniUrl;

const initialState = {
    paymentDetailStatus: null,
    paymentDetailError: null,
    paymentDetailLoaded: false,
    paymentRecord: null 
};

export const paymentSaveDetails = createAsyncThunk(
    "paymentSaveDetails",
    async (paymentDetailData, { rejectWithValue }) => {
        console.log("paymentDetailData", paymentDetailData);
        try {
            const response = await axios.post(
                paymentDetailSaveURL,
                paymentDetailData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const paymentSaveData = response.data;
            console.log("paymentSaveData", paymentSaveData)

            // localStorage.setItem("filedMemberRecord", JSON.stringify(filedMemberRecord));

            return paymentSaveData;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

const paymentDetailsSaveSlice = createSlice({
    name: "paymentDetailsSave",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(paymentSaveDetails.pending, (state, action) => {
            return {
                ...state,
                paymentDetailStatus: "pending",
                paymentDetailLoaded: true
            }
        })
        builder.addCase(paymentSaveDetails.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    paymentDetailLoaded: false,
                    paymentRecord: action.payload,
                    paymentDetailStatus: "Success",
                }
            }
            else {
                return state
            }
        })
        builder.addCase(paymentSaveDetails.rejected, (state, action) => {
            return {
                ...state,
                paymentDetailStatus: "rejected",
                paymentDetailError: action.payload
            }
        })
    }
})

export default paymentDetailsSaveSlice.reducer;
