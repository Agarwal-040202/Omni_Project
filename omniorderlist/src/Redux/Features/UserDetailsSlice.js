import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit"
import axios from "axios"


// Create Action

export const createNewUSer = createAsyncThunk("createuser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/register", userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }

})

// read Action
export const showUser = createAsyncThunk("showUser", async (data, { rejectWithValue }) => {

    // try {
    //     const response = await axios.post("http://localhost:8000/api/auth/fieldmemberlogin", data, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     return response.data;
    // }
    // catch (error) {
    //     return rejectWithValue(error);

    // }
})




export const userDetails = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        token: "",
        msg: ""
    },

    extraReducers: {

        [createNewUSer.pending]: (state) => {
            state.loading = true
        },
        [createNewUSer.fulfilled]: (state, action) => {
            state.loading = false
            state.users.push(action.payload)
        },
        [createNewUSer.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [showUser.pending]: (state) => {
            state.loading = true
        },

        [showUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload
        },
        [showUser.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },

    }

})


export default userDetails.reducer