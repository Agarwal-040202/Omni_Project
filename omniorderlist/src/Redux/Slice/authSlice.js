import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import OmniUrl from "../../URL/Url";

const { fieldmemberloginURL,registerFieldMemberURL } = OmniUrl;
//register user
const initialState = {
    // token: JSON?.parse(localStorage.getItem("token")) || "",
    // name: "",
    // email: "",
    // _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        console.log("userData", userData);
        try {
            const response = await axios.post(
                registerFieldMemberURL,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const token = response.data;
            // localStorage.setItem("token", JSON.stringify(token));

            return token;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

//login code
export const showUser1 = createAsyncThunk("showUser1", async (user, { rejectWithValue }) => {
    console.log("user",user)
    try {
        const response = await axios.post(fieldmemberloginURL, user, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const { token, User_Id, User_Name, User_Role, Email_Id,Contact } = response?.data; // Extract the desired fields from the response

       
        let personalInfo = { User_Id, User_Name, User_Role, Email_Id,Contact }

        sessionStorage.setItem('token', token)
        sessionStorage.setItem('loggedUserId', User_Id)
        sessionStorage.setItem('personalInfo', JSON.stringify(personalInfo))



        console.log("datata", response?.data)

        return response?.data;
    } catch (error) {
        console.log("errororr", error.response.data);
        return rejectWithValue(error.response.data);
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser(state,action){
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("loggedUserId");
            sessionStorage.removeItem("personalInfo");
            sessionStorage.clear();
            
            return{
                ...state,
                token:"",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false
            }
        }


    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending",userLoaded:true }
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    userLoaded:false,
                    token: action.payload,
                    registerStatus:"Success",

                }
            }
            else {
                return state
            }
        })
        builder.addCase(registerUser.rejected, (state, action) => {
               return{
                ...state,
                registerStatus:"rejected",
                registerError:action.payload
               }
        })

        //login code

        builder.addCase(showUser1.pending, (state, action) => {
            return { ...state, loginStatus: "pending", userLoaded: true }
        })
        builder.addCase(showUser1.fulfilled, (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    userLoaded: false,
                    token: action.payload,
                    loginStatus: "Success",

                }
            }
            else {
                return state
            }
        })
        builder.addCase(showUser1.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload
            }
        })
    }
})




export const {logoutUser} = authSlice.actions
export default authSlice.reducer;