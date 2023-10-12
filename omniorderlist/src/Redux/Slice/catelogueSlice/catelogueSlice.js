// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios"



// //add new field member
// const initialState = {
//     catelogugeDetailStatus: "",
//     catelogugeDetailError: "",
//     catelogugeDetailLoaded: false
// };

// export const catelogueDetail = createAsyncThunk(
//     "catelogueDetail",
//     async (catelogugeData, { rejectWithValue }) => {
//         console.log("catelogugeData", catelogugeData);
//         try {
//             const response = await axios.post(
//                 "http://localhost:8000/api/catalogue/caleloguedetail",
//                 catelogugeData,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             const catelogueRecored = response.data;
//             console.log("filedMemberRecored",catelogueRecored)
            
//             // localStorage.setItem("catelogueRecored", JSON.stringify(catelogueRecored));

//             return catelogueRecored;
//         } catch (error) {
//             console.log(error.response.data);
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


// const calelogueDetailSlice = createSlice({
//     name: "catelogueDetail",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(catelogueDetail.pending, (state, action) => {
//             return { ...state, catelogugeDetailStatus: "pending", catelogugeDetailLoaded: true }
//         })
//         builder.addCase(catelogueDetail.fulfilled, (state, action) => {
//             if (action.payload) {
//                 return {
//                     ...state,
//                     catelogugeDetailLoaded: false,
//                     catelogueRecored: action.payload,
//                     catelogugeDetailStatus: "Success",

//                 }
//             }
//             else {
//                 return state
//             }
//         })
//         builder.addCase(catelogueDetail.rejected, (state, action) => {
//             return {
//                 ...state,
//                 catelogugeDetailStatus: "rejected",
//                 catelogugeDetailError: action.payload
//             }
//         })

    

//     }
// })




// export default calelogueDetailSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Add new field member
const initialState = {
  catalogueDetailStatus: "", // Corrected variable name
  catalogueDetailError: "",  // Corrected variable name
  catalogueDetailLoaded: false, // Corrected variable name
  catalogueRecord: null, // Added this variable to store the record
};

export const catalogueDetail = createAsyncThunk(
  "catalogueDetail", // Corrected action name
  async (catalogueData, { rejectWithValue }) => {
    console.log("catalogueData", catalogueData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/catalogue/insertcatalogue", // Corrected URL
        catalogueData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const catalogueRecord = response.data;
      console.log("catalogueRecord", catalogueRecord);

      // localStorage.setItem("catalogueRecord", JSON.stringify(catalogueRecord));

      return catalogueRecord;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const catalogueDetailSlice = createSlice({
  name: "catalogueDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(catalogueDetail.pending, (state, action) => {
      return {
        ...state,
        catalogueDetailStatus: "pending",
        catalogueDetailLoaded: true,
      };
    });
    builder.addCase(catalogueDetail.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          catalogueDetailLoaded: false,
          catalogueRecord: action.payload, // Updated variable name
          catalogueDetailStatus: "Success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(catalogueDetail.rejected, (state, action) => {
      return {
        ...state,
        catalogueDetailStatus: "rejected",
        catalogueDetailError: action.payload,
      };
    });
  },
});

export default catalogueDetailSlice.reducer; // Corrected export name
