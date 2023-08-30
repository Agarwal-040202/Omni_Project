import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    updateFileldMemberDetailStatus: "",
    updateFileldMemberDetailError: "",
    updateFileldMemberDetailLoaded: false,
    updateFiledMemberRecored: null
};

export const updateFiledMemberData = createAsyncThunk(
    "updateFiledMemberData",
    async (updateFiledMemberData, { rejectWithValue }) => {
        try {
            let josnObj = {
                FieldMemberID: updateFiledMemberData
            }
            const response = await axios.post(
                "http://localhost:8000/api/users/update/userId",
                josnObj,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("hjhhkhkhhkhkhkhk", updateFiledMemberData)
            const updateFieldMemberData = response.data;
            console.log("updateFieldMemberData", updateFieldMemberData);

            return updateFieldMemberData;
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





const updateFieldMemberDataSlice = createSlice({
    name: "updateFiledMemberData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateFiledMemberData.pending, (state, action) => {
            return {
                ...state,
                updateFileldMemberDetailStatus: "pending",
                updateFileldMemberDetailLoaded: true
            };
        });
        builder.addCase(updateFiledMemberData.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    updateFileldMemberDetailLoaded: false,
                    filedMemberRecored: action.payload,
                    updateFileldMemberDetailStatus: "Success"
                };
            } else {
                return state;
            }
        });
        builder.addCase(updateFiledMemberData.rejected, (state, action) => {
            return {
                ...state,
                updateFileldMemberDetailStatus: "rejected",
                updateFileldMemberDetailError: action.payload
            };
        });
    }
});

// export const { actions: getFieldMemberDataActions } = getFieldMemberDataSlice;
export default updateFieldMemberDataSlice.reducer;
