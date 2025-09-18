import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { getPaymentDetailURL } = OmniUrl;

const initialState = {
  paymentDetailDataStatus: "",
  paymentDetailDataError: "",
  paymentDetailDataLoaded: false,
  paymentDetailData: [],
};

export const getPaymentDetalData = createAsyncThunk(
  "getPaymentDetalData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(getPaymentDetailURL, {
        params: { userId }, // Pass the user ID as a query parameter
        headers: {
          "Content-Type": "application/json",
        },
      });

      const paymentDetailData = response?.data;
      console.log("paymentDetailData", paymentDetailData?.data);
      return paymentDetailData;

    } catch (error) {
      console.error("paymentDetailDataError:", error);
      if (error.response) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
      }
      return rejectWithValue(error.message);
    }
  }
);

const paymentDetailSlice = createSlice({
  name: "paymentDetailData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentDetalData.pending, (state, action) => {
      return {
        ...state,
        paymentDetailStatus: "pending",
        paymentDetailLoaded: true,
      };
    });
    builder.addCase(getPaymentDetalData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          paymentDetailLoaded: false,
          paymentDetail: action?.payload,
          paymentDetailStatus: "Success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(getPaymentDetalData.rejected, (state, action) => {
      return {
        ...state,
        paymentDetailStatus: "rejected",
        paymentDetailError: action?.payload,
      };
    });
  },
});

export default paymentDetailSlice.reducer;

