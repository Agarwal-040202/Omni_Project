import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { reportListDetailURL } = OmniUrl;

const initialState = {
    reportListDetailStatus: null,
    reportListDetailError: null,
    reportListDetailLoaded: false,
    reportListRecord: null // Corrected variable name
};

export const reportListDetails = createAsyncThunk(
    "reportListDetails",
    async (reportListData, { rejectWithValue }) => {
        console.log("reportListData", reportListData);
        try {
            const response = await axios.post(
                reportListDetailURL,
                reportListData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const reportListRecord = response.data;
            console.log("reportListRecord", reportListRecord)

            // localStorage.setItem("filedMemberRecord", JSON.stringify(filedMemberRecord));

            return reportListRecord;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

const reportListDetailsSlice = createSlice({
    name: "reportListDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reportListDetails.pending, (state, action) => {
            return { ...state, reportListDetailStatus: "pending", reportListDetailLoaded: true }
        })
        builder.addCase(reportListDetails.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    reportListDetailLoaded: false,
                    reportListRecord: action.payload,
                    reportListDetailStatus: "Success",
                }
            }
            else {
                return state
            }
        })
        builder.addCase(reportListDetails.rejected, (state, action) => {
            return {
                ...state,
                reportListDetailStatus: "rejected",
                reportListDetailError: action.payload
            }
        })
    }
})

export default reportListDetailsSlice.reducer;
