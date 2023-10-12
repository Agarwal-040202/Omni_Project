import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  shopkeeperDataStatus: "",
  shopKeeperDataError: "",
  shopKeeperDataLoaded: false,
  shopKeeperData: [],
};

export const getShopkeeperData = createAsyncThunk(
  "shopKeeperData/getShopkeeperData", // Action name should be a string
  async (_, { rejectWithValue }) => { // You don't need the shopKeeperData parameter here
    try {
      const response = await axios.get(
        "http://localhost:8000/api/shopkeeper/getallshopkeeper",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const shopKeeperData = response?.data;
      console.log("shopKeeperData", shopKeeperData);

      return shopKeeperData;
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

const shopKeeperDataSlice = createSlice({
  name: "shopKeeperData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShopkeeperData.pending, (state, action) => {
      return {
        ...state,
        shopkeeperDataStatus: "pending",
        shopKeeperDataLoaded: true,
      };
    });
    builder.addCase(getShopkeeperData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          shopKeeperDataLoaded: false,
          shopKeeperData: action?.payload,
          shopkeeperDataStatus: "Success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(getShopkeeperData.rejected, (state, action) => {
      return {
        ...state,
        shopkeeperDataStatus: "rejected",
        shopKeeperDataError: action?.payload,
      };
    });
  },
});

export default shopKeeperDataSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//     shopkeeperDataStatus: "",
//     shopKeeperDataError: "",
//     shopKeeperDataLoaded: false,
//     shopKeeperData: []
// };

// export const getShopkeeperData = createAsyncThunk(
//     "getShopkeeperData",
//     async (shopKeeperData, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(
//                 "http://localhost:8000/api/shopkeeper/getallshopkeeper",
//                 {
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );

//             const shopKeeperData = response?.data;
//             console.log("shopKeeperData", shopKeeperData);

//             return shopKeeperData;
//         } catch (error) {
//             console.error("Error:", error);
//             if (error.response) {
//                 console.log("Response data:", error.response?.data);
//                 console.log("Response status:", error.response?.status);
//             }
//             return rejectWithValue(error.message);
//         }
//     }
// );

// const shopKeeperDataSlice = createSlice({
//     name: "shopKeeperData",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getShopkeeperData.pending, (state, action) => {
//             return {
//                 ...state,
//                 shopkeeperDataStatus: "pending",
//                 shopKeeperDataLoaded: true
//             };
//         });
//         builder.addCase(getShopkeeperData.fulfilled, (state, action) => {
//             if (action.payload) {
//                 return {
//                     ...state,
//                     shopKeeperDataLoaded: false,
//                     shopKeeperData: action?.payload,
//                     shopkeeperDataStatus: "Success"
//                 };
//             } else {
//                 return state;
//             }
//         });
//         builder.addCase(getShopkeeperData.rejected, (state, action) => {
//             return {
//                 ...state,
//                 shopkeeperDataStatus: "rejected",
//                 shopKeeperDataError: action?.payload
//             };
//         });
//     }
// });

// export default shopKeeperDataSlice.reducer;
