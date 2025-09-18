// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import OmniUrl from "../../../URL/Url";

// const { getOrderListDetailURL } = OmniUrl;
// const UserRole = JSON.parse(sessionStorage?.getItem("personalInfo")) || {};

// console.log("dssfscxzczx",UserRole?.User_Id)

// const initialState = {
//   orderlistDataStatus: "",
//   orderlistDataError: "",
//   orderlistDataLoaded: false,
//   orderlistData: [],
// };

// export const getOrderListData = createAsyncThunk(
//   "getOrderListData",
//   async (fileldMemberData, { rejectWithValue }) => {
//     try {
//       let josnObj={
//         FieldMemberID: UserRole?.User_Id
//     }
//       const response = await axios.get(getOrderListDetailURL,josnObj, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const orderlistData = response?.data;
//       // const orderlistData = orderlistData1?.data?.filter(item => item.orderListID === String(UserRole.User_Id)) || [];
//       console.log("orderlistDatadfsf", orderlistData);

//       return orderlistData;
//     } catch (error) {
//       console.error("orderlistDataError:", error);
//       if (error.response) {
//         console.log("Response data:", error.response?.data);
//         console.log("Response status:", error.response?.status);
//       }
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const orderlistDataSlice = createSlice({
//   name: "orderlistData",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getOrderListData.pending, (state, action) => {
//       return {
//         ...state,
//         orderlistDataStatus: "pending",
//         orderlistDataLoaded: true,
//       };
//     });
//     builder.addCase(getOrderListData.fulfilled, (state, action) => {
//       if (action.payload) {
//         return {
//           ...state,
//           orderlistDataLoaded: false,
//           orderlistData: action?.payload,
//           orderlistDataStatus: "Success",
//         };
//       } else {
//         return state;
//       }
//     });
//     builder.addCase(getOrderListData.rejected, (state, action) => {
//       return {
//         ...state,
//         orderlistDataStatus: "rejected",
//         orderlistDataError: action?.payload,
//       };
//     });
//   },
// });

// export default orderlistDataSlice.reducer;


// Redux slice code
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const { getOrderListDetailURL } = OmniUrl;

const initialState = {
  orderlistDataStatus: "",
  orderlistDataError: "",
  orderlistDataLoaded: false,
  orderlistData: [],
};

export const getOrderListData = createAsyncThunk(
  "getOrderListData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(getOrderListDetailURL, {
        params: { userId }, // Pass the user ID as a query parameter
        headers: {
          "Content-Type": "application/json",
        },
      });

      const orderlistData = response?.data;
      console.log("orderlistData", orderlistData);

      return orderlistData;
    } catch (error) {
      console.error("orderlistDataError:", error);
      if (error.response) {
        console.log("Response data:", error.response?.data);
        console.log("Response status:", error.response?.status);
      }
      return rejectWithValue(error.message);
    }
  }
);

const orderlistDataSlice = createSlice({
  name: "orderlistData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderListData.pending, (state, action) => {
      return {
        ...state,
        orderlistDataStatus: "pending",
        orderlistDataLoaded: true,
      };
    });
    builder.addCase(getOrderListData.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          orderlistDataLoaded: false,
          orderlistData: action?.payload,
          orderlistDataStatus: "Success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(getOrderListData.rejected, (state, action) => {
      return {
        ...state,
        orderlistDataStatus: "rejected",
        orderlistDataError: action?.payload,
      };
    });
  },
});

export default orderlistDataSlice.reducer;

