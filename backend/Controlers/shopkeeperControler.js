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

// update shopkeeper detail api
// export const updateShopkeeperDetail = (req, res) => {
//     let {
//       Logged_User_ID,
//       Logged_Email_ID,
//       Logged_User_Role,
//       Created_By,
//       Updated_By,
//       Is_Active,
//       Created_At,
//       Shopkeeper_ID,
//       Firm_Name,
//       Shopkeeper_First_Name,
//       Shopkeeper_Last_Name,
//       Contact,
//       Whatsup_Contact,
//       GST_Number,
//       Shopkeeper_Email,
//       Address1,
//       Country,
//       State,
//       City,
//       Pincode,
//       Village_Street,
//     } = req.body;
  
//     // UPDATE SHOPKEEPER DETAILS
  
//     const updateQuery =
//       "UPDATE shopkeeperdetails SET " +
//       "`Logged_User_ID` = ?, " +
//       "`Logged_Email_ID` = ?, " +
//       "`Logged_User_Role` = ?, " +
//       "`Created_By` = ?, " +
//       "`Updated_By` = ?, " +
//       "`Is_Active` = ?, " +
//       "`Created_At` = ?, " +
//       "`Firm_Name` = ?, " +
//       "`Shopkeeper_First_Name` = ?, " +
//       "`Shopkeeper_Last_Name` = ?, " +
//       "`Contact` = ?, " +
//       "`Whatsup_Contact` = ?, " +
//       "`GST_Number` = ?, " +
//       "`Shopkeeper_Email` = ?, " +
//       "`Address1` = ?, " +
//       "`Country` = ?, " +
//       "`State` = ?, " +
//       "`City` = ?, " +
//       "`Pincode` = ?, " +
//       "`Village_Street` = ? " +
//       "WHERE `Shopkeeper_ID` = ?";
  
//     const values = [
//       Logged_User_ID,
//       Logged_Email_ID,
//       Logged_User_Role,
//       Created_By,
//       Updated_By,
//       Is_Active,
//       Created_At,
//       Firm_Name,
//       Shopkeeper_First_Name,
//       Shopkeeper_Last_Name,
//       Contact,
//       Whatsup_Contact,
//       GST_Number,
//       Shopkeeper_Email,
//       Address1,
//       Country,
//       State,
//       City,
//       Pincode,
//       Village_Street,
//       Shopkeeper_ID,
//     ];
//     console.log(updateQuery, values);
//     db.query(updateQuery, values, (err, result) => {
//       if (err) {
//         console.log(err, values);
//         return res.status(500).json(err);
//       }
//       console.log("User details updated successfully!");
//       //    Fetch and return the updated user details
//       const updatedDataQuery =
//         "SELECT * FROM shopkeeperdetails WHERE Shopkeeper_ID = ?";
//       db.query(updatedDataQuery, [Shopkeeper_ID], (err, updatedData) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json(err);
//         }
  
//         console.log("Updated data:", updatedData[0]);
  
//         return res.status(200).json({
//           status: 200,
//           data: updatedData[0],
//           message: "Shopkeeper details have been updated successfully.",
//         });
//       });
//     });
//   };
  
export const updateShopkeeperDetail = (req, res) => {
  // Destructure request body using const
  const {
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
    Village_Street,
  } = req.body;

  // Check for duplicate GST_Number before performing the update
  const checkDuplicateQuery = `
    SELECT Shopkeeper_ID
    FROM shopkeeperdetails
    WHERE GST_Number = ?
  `;

  db.query(checkDuplicateQuery, [GST_Number], (err, duplicateResult) => {
    if (err) {
      console.error("Error checking for duplicate GST_Number:", err);
      return res.status(500).json(err);
    }

    // If duplicate GST_Number exists, return an error response
    if (duplicateResult.length > 0 && duplicateResult[0].Shopkeeper_ID !== Shopkeeper_ID) {
      return res.status(400).json({
        status: 400,
        message: "GST_Number is already in use by another shopkeeper.",
      });
    }

    // Define the SQL update query using template literals
    const updateQuery = `
      UPDATE shopkeeperdetails
      SET
        Logged_User_ID = ?,
        Logged_Email_ID = ?,
        Logged_User_Role = ?,
        Created_By = ?,
        Updated_By = ?,
        Is_Active = ?,
        Created_At = ?,
        Firm_Name = ?,
        Shopkeeper_First_Name = ?,
        Shopkeeper_Last_Name = ?,
        Contact = ?,
        Whatsup_Contact = ?,
        GST_Number = ?,
        Shopkeeper_Email = ?,
        Address1 = ?,
        Country = ?,
        State = ?,
        City = ?,
        Pincode = ?,
        Village_Street = ?
      WHERE Shopkeeper_ID = ?
    `;

    const values = [
      Logged_User_ID,
      Logged_Email_ID,
      Logged_User_Role,
      Created_By,
      Updated_By,
      Is_Active,
      Created_At,
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
      Village_Street,
      Shopkeeper_ID,
    ];

    // Execute the update query
    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error("Error updating shopkeeper details:", err);
        return res.status(500).json(err);
      }

      // Fetch and return the updated user details
      const updatedDataQuery = "SELECT * FROM shopkeeperdetails WHERE Shopkeeper_ID = ?";
      db.query(updatedDataQuery, [Shopkeeper_ID], (err, updatedData) => {
        if (err) {
          console.error("Error fetching updated data:", err);
          return res.status(500).json(err);
        }

        console.log("Shopkeeper details updated successfully!");
        return res.status(200).json({
          status: 200,
          data: updatedData[0],
          message: "Shopkeeper details have been updated successfully.",
        });
      });
    });
  });
};


