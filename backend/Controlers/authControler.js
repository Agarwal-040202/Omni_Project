import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// export const register = (req, res) => {
//     console.log('reqreq', req)

//     let { User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, Password } = req.body

//     // CHECK USER IF EXIST

//     const sqlQuery = "SELECT * FROM register_user WHERE User_Id = ?"

//     db.query(sqlQuery, [User_Name], (err, data) => {
//         if (err) return res.status(500).json(err)
//         if (data.length) return res.status(409).json("User already exixts!")

//         const salt = bcrypt.genSaltSync(10)
//         const hashedPassword = bcrypt.hashSync(Password, salt)


//         const sqlQuery = "INSERT INTO register_user (`User_Id`,`User_Role`,`User_Code`,`User_Name`,`Contact`,`Email_Id`,`Password`) VALUES (?)"

//         const values = [User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, hashedPassword]

//         db.query(sqlQuery, [values], (err, data) => {
//             if (err) return res.status(500).json(err)
//             return res.status(200).json({status: 200, data: data, message: "User has been created sucessfully."})
//         })
//         // if (data.affectedRows !=0){
             
//         //     const sqlQuery = "SELECT * FROM omni_orderlist.register_user";
//         //     db.query(sqlQuery,(err, data) => {
//         //         if (err) return res.status(500).json(err)
//         //         return res.status(200).json({ status: 200, data: data, message: "Response Data." })
//         //     })
//         // }
//     })
// }


// export const register = (req, res) => {
//     console.log('reqreq', req);

//     let { User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, Password } = req.body;

//     // CHECK IF USER ALREADY EXISTS

//     const sqlQuery = "SELECT * FROM register_user WHERE User_Id = ?";

//     db.query(sqlQuery, [User_Name], (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length) return res.status(409).json("User already exists!");

//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(Password, salt);

//         const insertQuery = "INSERT INTO register_user (`User_Id`,`User_Role`,`User_Code`,`User_Name`,`Contact`,`Email_Id`,`Password`) VALUES (?)";

//         const values = [User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, hashedPassword];

//         db.query(insertQuery, [values], (err, result) => {
//             if (err) return res.status(500).json(err);

//             const responseData = {
//                 status: 200,
//                 data: result,
//                 message: "User has been created successfully.",
//             };

//             return res.status(200).json(responseData);
//         });

//     });
// };

// old register code 
// export const register = (req, res) => {
//     let { User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, Password } = req.body;

//     // CHECK IF USER EXISTS

//     const checkQuery = "SELECT * FROM register_user WHERE User_Id = ?";
//     db.query(checkQuery, [User_Name], (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length) return res.status(409).json("User already exists!");

//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(Password, salt);

//         const insertQuery = "INSERT INTO register_user (`User_Id`,`User_Role`,`User_Code`,`User_Name`,`Contact`,`Email_Id`,`Password`) VALUES (?)";
//         const values = [User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, hashedPassword];

//         db.query(insertQuery, [values], (err, result) => {
//             if (err) return res.status(500).json(err);

//             const insertedDataQuery = "SELECT * FROM register_user WHERE User_Id = ?";
//             db.query(insertedDataQuery, [User_Id], (err, insertedData) => {
//                 if (err) return res.status(500).json(err);

//                 return res.status(200).json({
//                     status: 200,
//                     data: insertedData[0],
//                     message: "User has been created successfully.",
//                 });
//             });
//         });
//     });
// };

// new register user code

export const register = (req, res) => {
    const { User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, Password } = req.body;

    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM register_user WHERE User_Id = ?";
    db.query(checkQuery, [User_Id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (data.length) {
            return res.status(409).json({ error: "User already exists!" });
        }

        // Log values before saving to the database
        console.log('Values to be saved to the database:', {
            User_Id,
            User_Role,
            User_Code,
            User_Name,
            Contact,
            Email_Id,
            Password,
        });

        // Save user with plain text password
        const insertQuery = "INSERT INTO register_user (User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, Password) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [User_Id, User_Role, User_Code, User_Name, Contact, Email_Id, Password];

        db.query(insertQuery, values, (insertErr, result) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Log values after saving to the database
            console.log('Values saved to the database:', {
                User_Id,
                User_Role,
                User_Code,
                User_Name,
                Contact,
                Email_Id,
                Password,
            });

            return res.status(200).json({
                status: 200,
                message: "User has been created successfully.",
            });
        });
    });
};








// field member login code start

// export const fieldmemberlogin = (req, res) => {
    
//     console.log('reqreqjj', req)
//     const q = "SELECT * FROM register_user WHERE Email_Id = ? && User_Code = ?"
//     db.query(q, [req.body.Email_Id,req.body.User_Code], (err, data) => {

//         if (err) return res.status(500).json(err);

//         if (data?.length === 0) return res.status(404).json("User not found");

//         const checkPassword = bcrypt.compare(req.body.Password, data[0].Password)

//         if (!checkPassword) return res.status(400).json("Wrong user name and password.")

//         const token = jwt.sign({ User_Id: data[0].User_Id }, "secretkey")

//         const { Password, ...others } = data[0]
//         console.log('kkkktttt', others)

//         res.cookie("accessToken", token, {

//             httpOnly: true,

//         }).status(200).json(others);

//     })
// }

// old code login

// export const fieldmemberlogin = (req, res) => {
//     console.log('reqreqjj', req);
//     const q = "SELECT * FROM register_user WHERE Email_Id = ? && User_Code = ?";
    
//     db.query(q, [req.body.Email_Id, req.body.User_Code], (err, data) => {
//         if (err) return res.status(500).json(err);
        
//         if (!data || data.length === 0) return res.status(404).json("User not found");
        
//         const userData = data[0];
        
//         bcrypt.compare(req.body.Password, userData.Password, (bcryptErr, checkPassword) => {
//             if (bcryptErr) return res.status(500).json(bcryptErr);
            
//             if (!checkPassword) return res.status(400).json("Wrong username and password.");
            
//             const token = jwt.sign({ User_Id: userData.User_Id }, "secretkey");
            
//             const { Password, ...others } = userData;
            
//             console.log('kkkktttt', others);
            
//             res.cookie("accessToken", token, {
//                 httpOnly: true,
//             }).status(200).json(others);
//         });
//     });
// };

// new code login

export const fieldmemberlogin = (req, res) => {
    console.log('reqreqjj', req);
    const q = "SELECT * FROM register_user WHERE Email_Id = ? && User_Code = ?";
    
    db.query(q, [req.body.Email_Id, req.body.User_Code], (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (!data || data.length === 0) return res.status(404).json("User not found");
        
        const userData = data[0];
        
        // Directly compare passwords (without hashing)
        if (req.body.Password !== userData.Password) {
            return res.status(400).json("Wrong username and password.");
        }
        
        const token = jwt.sign({ User_Id: userData.User_Id }, "secretkey");
        
        const { Password, ...others } = userData;
        
        console.log('kkkktttt', others);
        
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    });
};


// export const fieldmemberlogin = (req, res) => {
//     const { Email_Id, User_Code, Password } = req.body;

//     const q = "SELECT User_Id, Email_Id, Password FROM register_user WHERE Email_Id = ? AND User_Code = ?";

//     db.query(q, [Email_Id, User_Code], (err, data) => {
//         if (err) {
//             console.error('Database query error:', err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }

//         console.log('Database query result:', data);

//         if (!data || data.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const userData = data[0];

//         console.log('User data:', userData);

//         // Trim the entered password before comparison
//         bcrypt.compare(Password.trim(), userData.Password, (bcryptErr, passwordMatches) => {
//             if (bcryptErr) {
//                 console.error('Bcrypt error:', bcryptErr);
//                 return res.status(500).json({ error: "Internal Server Error" });
//             }

//             // Use a different variable name for logging
//             console.log('Entered Password:', Password);
//             console.log('Hashed Password from Database:', userData.Password);
//             console.log('Trimmed and Compared Password:', Password.trim());
//             console.log('Password comparison result:', passwordMatches);

//             if (!passwordMatches) {
//                 return res.status(400).json({ error: "Wrong username and password" });
//             }

//             const token = jwt.sign({ User_Id: userData.User_Id }, process.env.SECRET_KEY || "defaultSecretKey");

//             const { Password: userPassword, ...others } = userData;

//             console.log('Generated token:', token);
//             console.log('Response data:', others);

//             res.cookie("accessToken", token, {
//                 httpOnly: true,
//             }).status(200).json(others);
//         });
//     });
// };








// field member login code end


// start get otp code for field member
export const logincode = (req, res) => {
    console.log('reqreq', req.body.User_Code, req.body.User_Role)

    const q = "SELECT * FROM register_user WHERE User_Code = ? and User_Role = ?"

    // app.get("/airline/:id",(req, res)=>{
    //     const airId = req.params.id;
    //     const qury = "SELECT *FROM airlinedata WHERE airid = ?"
    //     db.query(qury,[airId],(err,data)=>{
    //         if(err){
    //             return res.json(err)
    //         }
    //         else{
    //             return res.json(data);

    //         }

    //     })

    // })

    db.query(q, [req.body.User_Code, req.body.User_Role], (err, data) => {

        if (data?.length === 0) return res.status(404).json("User not found");

        if (err) {
            return res.status(500).json(err);
        } else {
            console.log(data)
            res.send(data)
        }

    })
}

// end get otp code for field member

// start get otp code for admin
export const admincode = (req, res) => {
    console.log('reqreq', req.body.User_Code, req.body.User_Role)

    const q = "SELECT * FROM register_user WHERE User_Code = ? and User_Role = ?"
    db.query(q, [req.body.User_Code, req.body.User_Role], (err, data) => {

        if (data?.length === 0) return res.status(404).json("User not found");

        if (err) {
            return res.status(500).json(err);
        } else {
            console.log(data)
            res.send(data)
        }

    })
}

// end get otp code for admin



export const logout = (req, res) => {

    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")

}