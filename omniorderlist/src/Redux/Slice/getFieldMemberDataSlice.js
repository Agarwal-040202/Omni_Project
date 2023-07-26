import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    fileldMemberDetailStatus: "",
    fileldMemberDetailError: "",
    fileldMemberDetailLoaded: false,
    filedMemberRecored: null
};

export const getFiledMemberData = createAsyncThunk(
    "getFiledMemberData",
    async (fileldMemberData, { rejectWithValue }) => {
        try {
            let josnObj={
                userId: fileldMemberData
            }
            const response = await axios.post(
                "http://localhost:8000/api/users/find/userId",
                josnObj,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const filedMemberRecored = response.data;
            console.log("filedMemberRecored", filedMemberRecored);

            return filedMemberRecored;
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





const getFieldMemberDataSlice = createSlice({
    name: "getFiledMemberData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFiledMemberData.pending, (state, action) => {
            return {
                ...state,
                fileldMemberDetailStatus: "pending",
                fileldMemberDetailLoaded: true
            };
        });
        builder.addCase(getFiledMemberData.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    fileldMemberDetailLoaded: false,
                    filedMemberRecored: action.payload,
                    fileldMemberDetailStatus: "Success"
                };
            } else {
                return state;
            }
        });
        builder.addCase(getFiledMemberData.rejected, (state, action) => {
            return {
                ...state,
                fileldMemberDetailStatus: "rejected",
                fileldMemberDetailError: action.payload
            };
        });
    }
});

export const { actions: getFieldMemberDataActions } = getFieldMemberDataSlice;
export default getFieldMemberDataSlice.reducer;
