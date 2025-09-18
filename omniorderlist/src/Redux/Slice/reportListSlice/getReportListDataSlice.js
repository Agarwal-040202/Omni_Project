import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { getReportListDetailURL } = OmniUrl;

const initialState = {
  reportlistDataStatus: "",
  reportlistDataError: "",
  reportlistDataLoaded: false,
  reportlistData: [],
};

export const getReportListData = createAsyncThunk(
  "getReportListData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(getReportListDetailURL, {
        params: { userId }, // Pass the user ID as a query parameter
        headers: {
          "Content-Type": "application/json",
        },
      });

      const reportlistData = response?.data;
      console.log("reportlistData", reportlistData);

      return reportlistData;
    } catch (error) {
      console.error("reportlistDataError:", error);
      if (error.response) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
      }
      return rejectWithValue(error.message);
    }
  }
);

const reportlistDataSlice = createSlice({
  name: "reportlistData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportListData.pending, (state, action) => {
      return {
        ...state,
        reportlistDataStatus: "pending",
        reportlistDataLoaded: true,
      };
    });
    builder.addCase(getReportListData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          reportlistDataLoaded: false,
          reportlistData: action?.payload,
          reportlistDataStatus: "Success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(getReportListData.rejected, (state, action) => {
      return {
        ...state,
        reportlistDataStatus: "rejected",
        reportlistDataError: action?.payload,
      };
    });
  },
});

export default reportlistDataSlice.reducer;

