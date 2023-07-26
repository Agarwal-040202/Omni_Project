import React, { useEffect, useState, useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid"
import "./loginform.css";
import { useLocation, useNavigate } from "react-router-dom"
import MyContext from "../../MyContext";
import { useDispatch, useSelector } from "react-redux"
import { showUser1 } from "../../Redux/Slice/authSlice";
import { registerUser } from "../../Redux/Slice/authSlice";


const LoginForm = () => {
  let { handleShopToast, setShowLoder } = useContext(MyContext)

  const navigate = useNavigate()

  const loaction = useLocation()
  const dispatch = useDispatch()
  // const { users, loading, error } = useSelector((state) => state.app)
  const { auth, userLoaded, registerStatus, token, loginStatus } = useSelector((state) => state.auth)
  console.log("authkkk", loginStatus)

  // console.log("location", loaction.state, users.length, loading, error)


  const inputReffPassword = useRef(null)
  const inputReffComparePassword = useRef(null)
  const Form = useRef(null)

  const [userIDState, setUserIDState] = useState("")
  const [userCodeState, setUserCodeState] = useState("")
  const [password, setPassword] = useState('');
  const [comparePassword, setComparePassword] = useState('')
  const [validateState, setValidateState] = useState(false)
  const [memberEmailState, setMemberEmailState] = useState("")
  const [memberPasswordState, setMemberPasswordState] = useState("")
  const [showRegisterPageState, setShowRegisterPageState] = useState(false)



  useEffect(() => {
    setUserIDState(uuidv4())
    // randemID.slice(0, 6)
  }, [])

  useEffect(() => {
    setUserCodeState(userIDState.slice(0, 6))
  }, [userIDState])

 

  // new code using redux start

  const [userDetailState, setUserDetailState] = useState({})
  const [getStatusState,setStatusState] = useState(false)

  useEffect(() => {
    if (getStatusState == true){
      callFunction()
    }
  }, [loginStatus])

  const userDetailFunction = (e) => {
    setUserDetailState({ ...userDetailState, [e.target.name]: e.target.value, ["User_Id"]: userIDState, ["User_Code"]: userCodeState, ["Password"]: password })
  }

  console.log("userDetailStatejkj", userDetailState, password)

  const registerHererFunction = () =>{
    loaction.state =""
  }


  // console.log("hhjhjhjh", loaction?.state?.userCode)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    let JsonObj = {
      "User_Code": loaction?.state?.userCode,
      "Email_Id": memberEmailState,
      "Password": memberPasswordState
    }

    if ((loaction.state == "Admin") || loaction?.state?.UserRole == "Field Member") {
      if (memberEmailState == "" || memberPasswordState == "") {
        handleShopToast(true, 'Error', 'Please fills both fields.')
      }
      else {

        try {
          dispatch(showUser1(JsonObj))
          setStatusState(true)

        } catch (err) {
          handleShopToast(true, 'Error', 'Invalid user name and password.')

        }

      }
    }


    if (showRegisterPageState == true) {

      if (userDetailState == "" || password == "" || comparePassword == "") {
        handleShopToast(true, 'Error', 'Please fills all fields.')
        return;
      }
      else if (validateState == false) {
        handleShopToast(true, 'Error', 'Password is not Valid.')

      }
      else if (password !== comparePassword) {
        handleShopToast(true, 'Error', 'Password is mismatched.')
        return;
      }

      else {

        try {
          dispatch(registerUser(userDetailState))
          setShowLoder(true)
          console.log("kjkjkkk", token)
          setTimeout(() => {
            handleShopToast(true, 'Success', 'User register sucessfully.')
            Form.current.reset();
            window.location.reload()
            setUserDetailState("")
          }, 3000)

        }
        catch (err) {
          handleShopToast(true, 'Error', 'Somthing went wrong.')

        }

      }
    }


  }

  const callFunction = () => {
    console.log("tokentoken", token)

    if (loginStatus == "pending") {
      setShowLoder(true)
    }
    else if (loginStatus == "Success") {
      
      // handleShopToast(true, 'Sucess', 'Login is successfully.')
      navigate("/fourbox")
    }
    else {
      handleShopToast(true, 'Error', 'Invalid user name and password.')

    }
  }

  // new code using redux end

  console.log("passwordpassword", password)

  function validatePassword(password) {
    // Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and be at least 8 characters long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  const handlePasswordChange = (event) => {

    let { value } = event.target
    setPassword(value);

    if (validatePassword(value)) {
      inputReffPassword.current.style.border = ""
      setValidateState(true)
    }
    else {
      inputReffPassword.current.style.borderBottom = "3px solid red"
      setValidateState(false)
    }
  };

  const reEnterPasswordChange = (event) => {
    let { value } = event.target
    setComparePassword(value)
    if (password != value) {
      inputReffComparePassword.current.style.borderBottom = "3px solid red"
      // setComparePassword("")
    }
    else {
      inputReffComparePassword.current.style.borderBottom = ""
      // setValidateState(true)
    }
  }

  const handleEmailChangeFunction = (event) => {
    setMemberEmailState(event.target.value)
  }

  const handlePasswordChangeFunction = (event) => {
    setMemberPasswordState(event.target.value)
  }

  const showRegisterPageFunction = () => {

    setShowRegisterPageState(true)
  }

  const disblesRegisterPageFunction = () => {
    setShowRegisterPageState(false)
    loaction.state = "Admin"
    
  }



  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  // if ((loaction.state == "Admin") || loaction.state == ("Field Member")) {

  //   if (memberEmailState == "" || memberPasswordState == "") {
  //     handleShopToast(true, 'Error', 'Please fills both fields.')

  //   }
  //   else {

  //     try {
  //       let JsonObj = {
  //         "Email_Id": memberEmailState,
  //         "Password": memberPasswordState
  //       }
  //       console.log("JsonObj", JsonObj)
  //       const res = await axios.post("http://localhost:8000/api/auth/fieldmemberlogin", JsonObj, {
  //         // withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       if (res) {
  //         console.log("respokknse", res)
  //         handleShopToast(true, 'Sucess', 'Login is successfully.')

  //       }
  //     }
  //     catch (err) {
  //       console.log("responseError", err)

  //       handleShopToast(true, 'Error', 'Something is wrong.')
  //     }

  //   }

  // }



  //   if (showRegisterPageState == true) {

  //     if (userRollState == "" || userNameState == "" || userEmailState == "" || userContactState == "" || password == "" || comparePassword == "") {
  //       handleShopToast(true, 'Error', 'Please fills all fields.')
  //       return;
  //     }
  //     else if (validateState == false) {
  //       handleShopToast(true, 'Error', 'Password is not Valid.')

  //     }
  //     else if (password !== comparePassword) {
  //       handleShopToast(true, 'Error', 'Password is mismatched.')
  //       return;
  //     }

  //     else {
  //       try {

  //         const inputObject = { userIDState, userRollState, userCodeState, userNameState, userContactState, userEmailState, password }
  //         console.log("inputObject", inputObject)

  //         let inputObject2 = JSON.stringify(inputObject)

  //         let JsonObj = {
  //           "User_Id": userIDState,
  //           "User_Role": userRollState,
  //           "User_Code": userCodeState,
  //           "User_Name": userNameState,
  //           "Contact": userContactState,
  //           "Email_Id": userEmailState,
  //           "Password": password

  //         }

  //         console.log('inputObject2', JsonObj)

  //         const respos = await axios.post("http://localhost:8000/api/auth/register", JsonObj, {
  //           headers: {
  //             'Content-Type': 'application/json'
  //           }
  //         });

  //         console.log("responsejjj", respos)

  //         if (respos) {
  //           console.log("respohhhnse", respos)
  //           setShowLoder(true)
  //           handleShopToast(true, 'Success', 'User register sucessfully.')

  //         }
  //       }
  //       catch (error) {
  //         console.log("response", error)

  //         handleShopToast(true, 'Error', 'Something is wrong.')

  //       }
  //     }

  //   }


  // };






  return (
    <div className="main-Div">

      <div className="container1 box">
        <span className="borderLine"></span>
        <div className="form">
          <input type="checkbox" id="flip" onClick={showRegisterPageFunction} />

          <div className="cover">
            <div className="front">
              <img src="LoginImage1.jpg" alt="" />
            </div>
            <div className="back">
              <img src="SignupImage1.jpg" className="" />
            </div>
          </div>
          <div className="forms">
            <div className="form-content">
              <div className="login-form">
                <div>
                  <img src="Omni-Logo-1.png" alt="" style={{ width: "80px" }} />
                </div>
                {/* Login form Start */}
                <div className="title">Sign In</div>
                <form onSubmit={handleFormSubmit} ref={Form}>
                  <div className="input-boxes">
                    <div className="input-box">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleEmailChangeFunction}
                        // autoComplete={false}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock"></i>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={handlePasswordChangeFunction}
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="text">
                      <a href="#">Forgot password?</a>
                    </div>
                    <div className="Login-Submit-div">
                      <button>Sign In</button>
                    </div>

                    {loaction.state == "Admin" ? <> <div className="text sign-up-text">
                      Don't have an account?{" "}
                      <label for="flip" onClick={registerHererFunction}>Register Here</label>
                    </div></> : ""}

                  </div>
                </form>
              </div>
              {/* Login form End */}

              <div className="signup-form">
                {/* Signup form Start */}

                <div className="title">Sign Up</div>
                <form onSubmit={handleFormSubmit} ref={Form}>

                  <div className="mt-3 d-flex gap-1">
                    <div className="" style={{
                      display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                      <h6 className="chooseRoll-tag-h6">Roll </h6>
                    </div>
                    <div className="d-flex gap-1">
                      <div>
                        <input
                          type="radio"
                          className="mx-1 radio-input"
                          name="User_Role"
                          value="Admin"
                          onChange={(e) => userDetailFunction(e)}

                        />
                        <span className="radio-sapn-tag">Admin</span>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="User_Role"
                          value="Field Member"
                          // checked
                          className="mx-1"
                          onChange={(e) => userDetailFunction(e)}

                        />
                        <span className="radio-sapn-tag">Field Member</span>

                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="input-box">
                      <i className="fas fa-user"></i>
                      <input
                        type="text"
                        name="User_Name"
                        placeholder="Enter your full name"
                        onChange={(e) => userDetailFunction(e)}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="text"
                        name="Email_Id"
                        placeholder="Enter your email"
                        onChange={(e) => userDetailFunction(e)}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="input-box">
                      <i className="fa fa-phone"></i>
                      <input
                        type="text"
                        name="Contact"
                        placeholder="Enter your contact number"
                        onChange={(e) => userDetailFunction(e)}
                        autoComplete="new-password"
                        minLength={10}
                        maxLength={10}
                      />
                    </div>
                    <div className="input-box">
                      <i className="fas fa-lock"></i>
                      <input
                        ref={inputReffPassword}
                        type="password"
                        name="Password"
                        placeholder="Enter your password"
                        // value={password} 
                        onChange={(e) => handlePasswordChange(e)}
                        autoComplete="new-password"
                      />
                    </div>

                    <div className="input-box">
                      <i className="fas fa-lock"></i>
                      <input
                        ref={inputReffComparePassword}
                        name="password"
                        type="Password"
                        placeholder="Re-Enter your password"
                        onChange={reEnterPasswordChange}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="Login-Submit-div">
                      <button
                      // onClick={handleFormSubmit}
                      >Sign Up</button>
                    </div>

                    <div className="text sign-up-text">
                      Already have an account?{" "}
                      <label for="flip" onClick={disblesRegisterPageFunction}>Login</label>
                    </div>
                  </div>
                </form>
                {/* Signup form end */}

              </div>
            </div>
          </div>
        </div >
      </div >

    </div >
  );
};

export default LoginForm;
