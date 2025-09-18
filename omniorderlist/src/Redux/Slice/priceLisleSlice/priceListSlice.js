import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  priceListDataStatus: "",
  priceListDataError: "",
  priceListDataLoaded: false,
  priceListData: [],
};

export const getPriceListData = createAsyncThunk(
  "pricelistData/getPriceListData", // Action name should be a string
  async (priceListName, { rejectWithValue }) => { // You don't need the shopKeeperData parameter here
    try {
      const response = await axios.get(
        `http://localhost:8000/api/pricelist/pricelist${priceListName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const priceListData = response?.data;
      console.log("priceListgdssdfData", priceListName,priceListData);

      return priceListData;
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
      }
      return rejectWithValue(error.message);
    }
  }
);

const priceListDataSlice = createSlice({
  name: "priceListData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPriceListData.pending, (state, action) => {
      return {
        ...state,
        priceListDataStatus: "pending",
        priceListDataLoaded: true,
      };
    });
    builder.addCase(getPriceListData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          priceListDataLoaded: false,
          priceListData: action?.payload,
          priceListDataStatus: "Success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(getPriceListData.rejected, (state, action) => {
      return {
        ...state,
        priceListDataStatus: "rejected",
        priceListDataError: action?.payload,
      };
    });
  },
});

export default priceListDataSlice.reducer;



