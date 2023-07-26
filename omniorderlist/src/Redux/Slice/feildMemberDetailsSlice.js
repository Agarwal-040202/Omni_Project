import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"



//add new field member
const initialState = {
    fileldMemberDetailStatus: "",
    fileldMemberDetailError: "",
    fileldMemberDetailLoaded: false
};

export const fileldMemberDetail = createAsyncThunk(
    "fileldMemberDetail",
    async (fileldMemberData, { rejectWithValue }) => {
        console.log("fileldMemberData", fileldMemberData);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/userdetail",
                fileldMemberData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const filedMemberRecored = response.data;
            console.log("filedMemberRecored",filedMemberRecored)
            
            // localStorage.setItem("filedMemberRecored", JSON.stringify(filedMemberRecored));

            return filedMemberRecored;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);


const fileldMemberDetailSlice = createSlice({
    name: "fileldMemberDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fileldMemberDetail.pending, (state, action) => {
            return { ...state, fileldMemberDetailStatus: "pending", fileldMemberDetailLoaded: true }
        })
        builder.addCase(fileldMemberDetail.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    fileldMemberDetailLoaded: false,
                    filedMemberRecored: action.payload,
                    fileldMemberDetailStatus: "Success",

                }
            }
            else {
                return state
            }
        })
        builder.addCase(fileldMemberDetail.rejected, (state, action) => {
            return {
                ...state,
                fileldMemberDetailStatus: "rejected",
                fileldMemberDetailError: action.payload
            }
        })

    

    }
})




export default fileldMemberDetailSlice.reducer;


