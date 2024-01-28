import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import OmniUrl from "../../../URL/Url";

const {updateShopkeeperDetailURL} = OmniUrl

const initialState = {
    updateShopKeeperDetailStatus: "",
    updateShopKeeperDetailError: "",
    updateShopKeeperDetailLoaded: false,
    updateShopKeeperRecored: null
};

export const updateShopkeeperData = createAsyncThunk(
    "updateShopkeeperData",
    async (updateShopkeeperData1, { rejectWithValue }) => {
        try {
            // let josnObj = {
            //       updateFiledMemberData1
            // }
            const response = await axios.put(
                updateShopkeeperDetailURL,
                updateShopkeeperData1,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const updateShopkeeperData2 = response.data;
            console.log("updateShopkeeperData2", updateShopkeeperData2);

            return updateShopkeeperData2;
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

const updateShopkeeperDataSlice = createSlice({
    name: "updateShopkeeperDataSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateShopkeeperData.pending, (state, action) => {
            return {
                ...state,
                updateShopKeeperDetailStatus: "pending",
                updateShopKeeperDetailLoaded: true
            };
        });
        builder.addCase(updateShopkeeperData.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    updateShopKeeperDetailLoaded: false,
                    updateShopKeeperRecored: action.payload,
                    updateShopKeeperDetailStatus: "Success"
                };
            } else {
                return state;
            }
        });
        builder.addCase(updateShopkeeperData.rejected, (state, action) => {
            return {
                ...state,
                updateShopKeeperDetailStatus: "rejected",
                updateShopKeeperDetailError: action.payload
            };
        });
    }
});

// Export the reducer and actions if needed
export default updateShopkeeperDataSlice.reducer;

