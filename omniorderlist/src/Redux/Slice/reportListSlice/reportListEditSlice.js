import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { updateReportDetailURL } = OmniUrl;

const initialState = {
    updateReportDetailStatus: "",
    updateReportDetailError: "",
    updateReportDetailLoaded: false,
    updateReportRecored: null
};

export const updateReportListData = createAsyncThunk(
    "updateReportListData",
    async (updateReportData1, { rejectWithValue }) => {
        console.log("ljlkhlkhlhl",updateReportData1)
        try {
            const response = await axios.put(
                updateReportDetailURL,
                updateReportData1,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const updateReportData2 = response.data;
            console.log("updateOrderData", updateReportData2);

            return updateReportData2;
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

const updateReportListSlice = createSlice({
    name: "updateReportListData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateReportListData.pending, (state, action) => {
            return {
                ...state,
                updateReportDetailStatus: "pending",
                updateReportDetailLoaded: true // Change this to true
            };
        });
        builder.addCase(updateReportListData.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    updateReportDetailLoaded: false,
                    updateReportRecored: action.payload,
                    updateReportDetailStatus: "Success"
                };
            } else {
                return state;
            }
        });
        builder.addCase(updateReportListData.rejected, (state, action) => {
            return {
                ...state,
                updateReportDetailStatus: "rejected",
                updateReportDetailError: action.payload
            };
        });
    }
});

export default updateReportListSlice.reducer;
