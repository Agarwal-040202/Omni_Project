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

