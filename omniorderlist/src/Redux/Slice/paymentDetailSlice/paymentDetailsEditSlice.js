import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { updatePaymentDetailURL } = OmniUrl;

const initialState = {
    updatePaymentDetailStatus: "",
    updatePaymentDetailError: "",
    updatePaymentDetailLoaded: false,
    updatePaymentRecored: null
};

export const updatePaymentData = createAsyncThunk(
    "updatePaymentData",
    async (updatePaymentData1, { rejectWithValue }) => {
        console.log("ljlkhlkhlhl",updatePaymentData1)
        try {
            const response = await axios.put(
                updatePaymentDetailURL,
                updatePaymentData1,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const updatePaymentData2 = response.data;
            console.log("updateOrderData", updatePaymentData2);

            return updatePaymentData2;
        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
            }
            return rejectWithValue(error.message);
        }
    }
);

const updatePaymentSlice = createSlice({
    name: "updatePaymentData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updatePaymentData.pending, (state, action) => {
            return {
                ...state,
                updatePaymentDetailStatus: "pending",
                updatePaymentDetailLoaded: true // Change this to true
            };
        });
        builder.addCase(updatePaymentData.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    updatePaymentDetailLoaded: false,
                    updatePaymentRecored: action.payload,
                    updatePaymentDetailStatus: "Success"
                };
            } else {
                return state;
            }
        });
        builder.addCase(updatePaymentData.rejected, (state, action) => {
            return {
                ...state,
                updatePaymentDetailStatus: "rejected",
                updatePaymentDetailError: action.payload
            };
        });
    }
});

export default updatePaymentSlice.reducer;
