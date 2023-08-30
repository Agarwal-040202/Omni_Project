import { db } from "../connect.js";

export const addShopkeeperDetail = (req, res) => {
    let {
        Logged_User_ID,
        Logged_Email_ID,
        Logged_User_Role,
        Created_By,
        Updated_By,
        Is_Active,
        Created_At,
        Shopkeeper_ID,
        Firm_Name,
        Shopkeeper_First_Name,
        Shopkeeper_Last_Name,
        Contact,
        Whatsup_Contact,
        GST_Number,
        Shopkeeper_Email,
        Address1,
        Country,
        State,
        City,
        Pincode,
        Village_Street
    } = req.body;

    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM shopkeeperdetails WHERE GST_Number = ?";
    db.query(checkQuery, [Shopkeeper_ID], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (data.length) {
            console.log("Shopkeeper already exists!");
            return res.status(409).json("Shopkeeper already exists!");
        }

        const insertQuery = "INSERT INTO shopkeeperdetails (`Logged_User_ID`, `Logged_Email_ID`, `Logged_User_Role`, `Created_By`,`Updated_By`, `Is_Active`,`Created_At`, `Shopkeeper_ID`, `Firm_Name`, `Shopkeeper_First_Name`, `Shopkeeper_Last_Name`, `Contact`, `Whatsup_Contact`, `GST_Number`, `Shopkeeper_Email`, `Address1`, `Country`, `State`, `City`, `Pincode`, `Village_Street`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const values = [Logged_User_ID, Logged_Email_ID, Logged_User_Role, Created_By, Updated_By, Is_Active, Created_At, Shopkeeper_ID, Firm_Name, Shopkeeper_First_Name, Shopkeeper_Last_Name, Contact, Whatsup_Contact, GST_Number, Shopkeeper_Email, Address1, Country, State, City, Pincode, Village_Street];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.log(err, values, "kjukiujuikj");
                return res.status(500).json(err);
            }

            const insertedDataQuery = "SELECT * FROM shopkeeperdetails WHERE Shopkeeper_ID = ?";
            db.query(insertedDataQuery, [Shopkeeper_ID], (err, insertedData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                console.log("Inserted data:", insertedData[0]);

                return res.status(200).json({
                    status: 200,
                    data: insertedData[0],
                    message: "Shopkeeper has been created successfully.",
                });
            });
        });
    });
};


// const db = require('./path/to/your/database/connection'); // Replace with your database connection setup

export const getShopkeeperDetail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM shopkeeperdetails";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error retrieving shopkeeper data.",
            });
        }
       
        console.log("Shopkeeper data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Shopkeeper data retrieved successfully.",
        });
    });
};


// export const updateShopkeeperDetail = (req, res) => {
//     let {
//         Logged_User_ID,
//         Logged_Email_ID,
//         Logged_User_Role,
//         Created_By,
//         Updated_By,
//         Is_Active,
//         Created_At,
//         Shopkeeper_ID,
//         Firm_Name,
//         Shopkeeper_First_Name,
//         Shopkeeper_Last_Name,
//         Contact,
//         Whatsup_Contact,
//         GST_Number,
//         Shopkeeper_Email,
//         Address1,
//         Country,
//         State,
//         City,
//         Pincode,
//         Village_Street
//     } = req.body;

//     // CHECK IF SHOPKEEPER EXISTS
//     const checkQuery = "SELECT * FROM shopkeeperdetails WHERE Shopkeeper_ID = ?";
//     db.query(checkQuery, [Shopkeeper_ID], (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json(err);
//         }
//         if (!data.length) {
//             console.log("Shopkeeper does not exist!");
//             return res.status(404).json("Shopkeeper does not exist!");
//         }

//         // UPDATE SHOPKEEPER DETAILS
//         const updateQuery = "UPDATE shopkeeperdetails SET " +
//             "`Logged_User_ID` = ?, " +
//             "`Logged_Email_ID` = ?, " +
//             "`Logged_User_Role` = ?, " +
//             "`Created_By` = ?, " +
//             "`Updated_By` = ?, " +
//             "`Is_Active` = ?, " +
//             "`Created_At` = ?, " +
//             "`Firm_Name` = ?, " +
//             "`Shopkeeper_First_Name` = ?, " +
//             "`Shopkeeper_Last_Name` = ?, " +
//             "`Contact` = ?, " +
//             "`Whatsup_Contact` = ?, " +
//             "`GST_Number` = ?, " +
//             "`Shopkeeper_Email` = ?, " +
//             "`Address1` = ?, " +
//             "`Country` = ?, " +
//             "`State` = ?, " +
//             "`City` = ?, " +
//             "`Pincode` = ?, " +
//             "`Village_Street` = ? " +
//             "WHERE `Shopkeeper_ID` = ?";

//         const values = [
//             Logged_User_ID,
//             Logged_Email_ID,
//             Logged_User_Role,
//             Created_By,
//             Updated_By,
//             Is_Active,
//             Created_At,
//             Firm_Name,
//             Shopkeeper_First_Name,
//             Shopkeeper_Last_Name,
//             Contact,
//             Whatsup_Contact,
//             GST_Number,
//             Shopkeeper_Email,
//             Address1,
//             Country,
//             State,
//             City,
//             Pincode,
//             Village_Street,
//             Shopkeeper_ID
//         ];

//         db.query(updateQuery, values, (err, result) => {
//             if (err) {
//                 console.log(err, values);
//                 return res.status(500).json(err);
//             }

//             const updatedDataQuery = "SELECT * FROM shopkeeperdetails WHERE Shopkeeper_ID = ?";
//             db.query(updatedDataQuery, [Shopkeeper_ID], (err, updatedData) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).json(err);
//                 }

//                 console.log("Updated data:", updatedData[0]);

//                 return res.status(200).json({
//                     status: 200,
//                     data: updatedData[0],
//                     message: "Shopkeeper details have been updated successfully.",
//                 });
//             });
//         });
//     });
// };


