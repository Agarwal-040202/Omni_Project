import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { updateOrderDetailURL } = OmniUrl;

const initialState = {
    updateOrderDetailStatus: "",
    updateOrderDetailError: "",
    updateOrderDetailLoaded: false,
    updateOrderRecored: null
};

export const updateOrderListData = createAsyncThunk(
    "updateOrderListData",
    async (updateOrderData1, { rejectWithValue }) => {
        console.log("ljlkhlkhlhl",updateOrderData1)
        try {
            const response = await axios.put(
                updateOrderDetailURL,
                updateOrderData1,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const updateOrderData2 = response.data;
            console.log("updateOrderData", updateOrderData2);

            return updateOrderData2;
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

const updateOrderListSlice = createSlice({
    name: "updateOrderListData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateOrderListData.pending, (state, action) => {
            return {
                ...state,
                updateOrderDetailStatus: "pending",
                updateOrderDetailLoaded: true // Change this to true
            };
        });
        builder.addCase(updateOrderListData.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    updateOrderDetailLoaded: false,
                    updateOrderRecored: action.payload,
                    updateOrderDetailStatus: "Success"
                };
            } else {
                return state;
            }
        });
        builder.addCase(updateOrderListData.rejected, (state, action) => {
            return {
                ...state,
                updateOrderDetailStatus: "rejected",
                updateOrderDetailError: action.payload
            };
        });
    }
});

export default updateOrderListSlice.reducer;
