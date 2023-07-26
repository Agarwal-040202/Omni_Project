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
    let { FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, Gender, Nationality, MaritalStatus, Qualification, Address, Country, State, City, Pincode } = req.body;

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

        const insertQuery = "INSERT INTO fieldmemberdetails (`FieldMemberID`,`FieldMember_Firstname`,`FieldMember_LastName`,`FieldMember_EmailID`,`FieldMember_Role`,`FieldMember_Contact`,`Gender`,`Nationality`,`MaritalStatus`,`Qualification`,`Address`,`Country`,`State`,`City`,`Pincode`) VALUES (?)";
        const values = [FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, Gender, Nationality, MaritalStatus, Qualification, Address, Country, State, City, Pincode];

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
    db.query(q, [req.body.userId], (err, data) => {
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



