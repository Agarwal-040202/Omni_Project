// import { db } from "../connect.js"


// export const UserDetail = (req,res) =>{
//     let { FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, Gender, Nationality, MaritalStatus, Qualification, Address, Country, State, City, Pincode } = req.body;

//     // CHECK IF USER EXISTS

//     const checkQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
//     db.query(checkQuery, [FieldMemberID], (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length) return res.status(409).json("User already exists!");

       

//         const insertQuery = "INSERT INTO fieldmemberdetails (`FieldMemberID`,`FieldMember_Firstname`,`FieldMember_LastName`,`FieldMember_EmailID`,`FieldMember_Role`,`FieldMember_Contact`,`Gender`,`Nationality`,`MaritalStatus`,`Qualification`,`Address`,`Country`,`State`,`City`,`Pincode`) VALUES (?)";
        
        
//         const values = [FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, Gender, Nationality, MaritalStatus, Qualification, Address, Country, State, City, Pincode];

//         db.query(insertQuery, [values], (err, result) => {
//             if (err) return res.status(500).json(err);

//             const insertedDataQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
//             db.query(insertedDataQuery, [FieldMemberID], (err, insertedData) => {
//                 if (err) return res.status(500).json(err);

//                 return res.status(200).json({
//                     status: 200,
//                     data: insertedData[0],
//                     message: "User has been created successfully.",
//                 });
//             });
//         });
//     });
// }

// export const getUser = (req, res) =>{

    
// }


import { db } from "../connect.js";

export const UserDetail = (req, res) => {
    let { FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, FieldMember_CreatedAt, Gender, Nationality, MaritalStatus, Qualification, Date_Of_Joining, Address, Country, State, City, Pincode } = req.body;

    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
    db.query(checkQuery, [FieldMemberID], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (data.length) {
            console.log("User already exists!");
            return res.status(409).json("User already exists!");
        }

        const insertQuery = "INSERT INTO fieldmemberdetails (`FieldMemberID`,`FieldMember_Firstname`,`FieldMember_LastName`,`FieldMember_EmailID`,`FieldMember_Role`,`FieldMember_Contact`,`FieldMember_CreatedAt`,`Gender`,`Nationality`,`MaritalStatus`,`Qualification`,`Date_Of_Joining`,`Address`,`Country`,`State`,`City`,`Pincode`) VALUES (?)";
        const values = [FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, FieldMember_CreatedAt, Gender, Nationality, MaritalStatus, Qualification, Date_Of_Joining, Address, Country, State, City, Pincode];

        db.query(insertQuery, [values], (err, result) => {
            if (err) {
                console.log(err,values,"kjukiujuikj");
                return res.status(500).json(err);
            }

            const insertedDataQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
            db.query(insertedDataQuery, [FieldMemberID], (err, insertedData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                console.log("Inserted data:", insertedData[0]);

                return res.status(200).json({
                    status: 200,
                    data: insertedData[0],
                    message: "User has been created successfully.",
                });
            });
        });
    });
};

export const getUserDetails = (req, res) => {
    console.log('reqreq',req, req.body.FieldMemberID);
    console.log('userId', req.query.userId, req.body.userId)
    // req.query.userId
    

    const q = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
    db.query(q, [req.body.FieldMemberID], (err, data) => {
        if (data?.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        if (err) {
            return res.status(500).json({ error: err });
        }

        console.log(data);
        res.json(data); // Send the response as JSON
    });
};


// update api

export const updateUserDetail = (req, res) => {
    let { FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, FieldMember_CreatedAt, Gender, Nationality, MaritalStatus, Qualification, Date_Of_Joining,Address, Country, State, City, Pincode } = req.body;

    // CHECK IF USER EXISTS
    // const checkQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
    // db.query(checkQuery, [FieldMemberID], (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).json(err);
    //     }
    //     if (!data.length) {
    //         console.log("User does not exist!");
    //         return res.status(404).json("User does not exist!");
    //     }

        // UPDATE USER DETAILS
        const updateQuery = "UPDATE fieldmemberdetails SET " +
            "FieldMember_Firstname = ?, " +
            "FieldMember_LastName = ?, " +
            "FieldMember_EmailID = ?, " +
            "FieldMember_Role = ?, " +
            "FieldMember_Contact = ?, " +
            "FieldMember_CreatedAt = ?," +
            "Gender = ?, " +
            "Nationality = ?, " +
            "MaritalStatus = ?, " +
            "Qualification = ?, " +
            "Address = ?, " +
            "Date_Of_Joining=?,"+
            "Country = ?, " +
            "State = ?, " +
            "City = ?, " +
            "Pincode = ? " +
            "WHERE FieldMemberID = ?";

        const values = [
            FieldMember_Firstname,
            FieldMember_LastName,
            FieldMember_EmailID,
            FieldMember_Role,
            FieldMember_Contact,
            FieldMember_CreatedAt,
            Gender,
            Nationality,
            MaritalStatus,
            Qualification,
            Address,
            Date_Of_Joining,
            Country,
            State,
            City,
            Pincode,
            FieldMemberID
        ];

        console.log(updateQuery,values)
        db.query(updateQuery, values, (err, result) => {
            if (err) {
                console.log(err, values);
                return res.status(500).json(err);
            }

            console.log("User details updated successfully!");

            // Fetch and return the updated user details
            const updatedDataQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
            db.query(updatedDataQuery, [FieldMemberID], (err, updatedData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                return res.status(200).json({
                    status: 200,
                    data: updatedData[0],
                    message: "User details have been updated successfully ho gyi hai.",
                });
            });
        });
    // });
};

// export const updateUserDetail = (req, res) => {
//     const {
//         FieldMemberID,
//         FieldMember_Firstname,
//         FieldMember_LastName,
//         FieldMember_EmailID,
//         FieldMember_Role,
//         FieldMember_Contact,
//         FieldMember_CreatedAt,
//         Gender,
//         Nationality,
//         MaritalStatus,
//         Qualification,
//         Date_Of_Joining,
//         Address,
//         Country,
//         State,
//         City,
//         Pincode
//     } = req.body;

//     // Check if user exists
//     const checkQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
//     db.query(checkQuery, [FieldMemberID], (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Internal server error" });
//         }
//         if (!data.length) {
//             return res.status(404).json({ error: "User does not exist" });
//         }

//         // Update user details
//         const updateQuery = `
//             UPDATE fieldmemberdetails SET
//             FieldMember_Firstname = ?,
//             FieldMember_LastName = ?,
//             FieldMember_EmailID = ?,
//             FieldMember_Role = ?,
//             FieldMember_Contact = ?,
//             FieldMember_CreatedAt = ?,
//             Gender = ?,
//             Nationality = ?,
//             MaritalStatus = ?,
//             Qualification = ?,
//             Address = ?,
//             Date_Of_Joining = ?,
//             Country = ?,
//             State = ?,
//             City = ?,
//             Pincode = ?
//             WHERE FieldMemberID = ?
//         `;

//         const values = [
//             FieldMember_Firstname,
//             FieldMember_LastName,
//             FieldMember_EmailID,
//             FieldMember_Role,
//             FieldMember_Contact,
//             FieldMember_CreatedAt,
//             Gender,
//             Nationality,
//             MaritalStatus,
//             Qualification,
//             Address,
//             Date_Of_Joining,
//             Country,
//             State,
//             City,
//             Pincode,
//             FieldMemberID
//         ];

//         db.beginTransaction((err) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: "Transaction error" });
//             }

//             db.query(updateQuery, values, (err, result) => {
//                 if (err) {
//                     console.error(err, values);
//                     db.rollback(() => {
//                         console.error("Rollback the transaction");
//                         return res.status(500).json({ error: "Database error" });
//                     });
//                 } else {
//                     db.commit((err) => {
//                         if (err) {
//                             console.error("Commit error", err);
//                             return res.status(500).json({ error: "Database error" });
//                         }

//                         console.log("User details updated successfully!");

//                         // Fetch and return the updated user details
//                         const updatedDataQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
//                         db.query(updatedDataQuery, [FieldMemberID], (err, updatedData) => {
//                             if (err) {
//                                 console.error(err);
//                                 return res.status(500).json({ error: "Database error" });
//                             }

//                             return res.status(200).json({
//                                 status: 200,
//                                 data: updatedData[0],
//                                 message: "User details have been updated successfully.",
//                             });
//                         });
//                     });
//                 }
//             });
//         });
//     });
// };




