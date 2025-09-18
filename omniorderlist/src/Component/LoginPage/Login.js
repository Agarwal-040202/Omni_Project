import React, { useContext, useState } from 'react'
import "./login.css"
import { Button } from 'react-bootstrap'
import axios from 'axios'
import MyContext from "../../MyContext";
import { useSelector } from 'react-redux';


const Login = () => {
    let { handleShopToast } = useContext(MyContext)

const auth = useSelector((state)=>state.auth)

// console.log("auth",auth)

    const [memberEmailState, setMemberEmailState] = useState("")
    const [memberPasswordState, setMemberPasswordState] = useState("")

    const handleEmailChangeFunction = (event) => {
        setMemberEmailState(event.target.value)
    }

    const handlePasswordChangeFunction = (event) => {
        setMemberPasswordState(event.target.value)
    }

    const hnadleSubmitLogin = async () => {

        if (memberEmailState == "" || memberPasswordState == "") {
            handleShopToast(true, 'Error', 'Please fills all fields.')

        }
        else {

            try {
                let JsonObj = {
                    "Email_Id": memberEmailState,
                    "Password": memberPasswordState
                }
                console.log("JsonObj", JsonObj)
                const res = await axios.post("http://localhost:8000/api/auth/fieldmemberlogin", JsonObj, {
                    // withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (res) {
                    console.log("respokknse", res)
                    handleShopToast(true, 'Sucess', 'Login is successfully.')

                }
            }
            catch (err) {
                console.log("responseError", err)

                handleShopToast(true, 'Error', 'Something is wrong.')
            }

        }
    }



    return (
        <div className='main-div-Login'>
            <div className='box1'>
                <span className='borderLine1'></span>

                <form>
                    <div className='d-flex justify-content-center align-items-center mb-3'>
                        <img src="Omni-Logo-1.png" alt="" />
                    </div>
                    <h2>Sign In</h2>
                    <div className='inputBox1'>
                        <input
                            type='email'
                            onChange={handleEmailChangeFunction}
                        />
                        <span>User Email</span>
                        <i></i>
                    </div>
                    <div className='inputBox1'>
                        <input
                            type='password'
                            onChange={handlePasswordChangeFunction}
                        />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div className='links1'>
                        <a href='#' >Forgot Password ?</a>
                        {/* <a href='#' >Sign Up</a> */}

                    </div>
                    <div className='login-div'>
                        <Button className='login-btn' onClick={hnadleSubmitLogin}>Login</Button>
                    </div>
                    {/* <input type='submit' value="Login" /> */}
                </form>
            </div>
        </div>
    )
}

export default Login