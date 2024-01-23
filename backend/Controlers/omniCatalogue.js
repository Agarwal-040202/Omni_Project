import { db } from "../connect.js";

// export const createCatalogues = (req, res) => {
//   const jsonData = req.body; // Assuming req.body is an array of JSON data objects

//   // Define the SQL query to insert multiple records into the database
//   const insertQuery = `INSERT INTO fullcut_ss_410 (Schrew_Name, Size, Packing, Price) VALUES ?`;

//   // Extract the values from the JSON data objects and create a 2D array
//   const values = jsonData.map((item) => [
//     item.Schrew_Name,
//     item.Size,
//     item.Packing,
//     item.Price,
//   ]);

//   // Execute the SQL query with prepared statements for batch insertion
//   db.query(insertQuery, [values], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json(err);
//     }

//     console.log('Batch insertion of catalogue records completed.');

//     // Return a success response
//     return res.status(201).json({
//       status: 201,
//       message: 'Catalogue records have been created successfully.',
//     });
//   });
// };
export const createCatalogues = (req, res) => {

  const jsonData = req.body; // Assuming req.body is an array of JSON data objects

  // Define the SQL query to delete all existing records from the table
  const deleteQuery = `DELETE FROM drywall410golden`;
  
  // Define the SQL query to insert multiple records into the database
  const insertQuery = `
    INSERT INTO drywall410golden (drywall410golden_ID,Schrew_Name, Size, Packing, Price)
    VALUES ?
  `;
  
  // Extract the values from the JSON data objects and create a 2D array
  const values = jsonData.map((item) => [
    item.drywall410golden_ID,
    item.Schrew_Name,
    item.Size,
    item.Packing,
    item.Price,
  ]);
  
  // Execute the delete query
  db.query(deleteQuery, (deleteErr) => {
    if (deleteErr) {
      console.error('Error deleting existing records:', deleteErr);
      return res.status(500).json(deleteErr);
    }
  
    // Execute the insert query with prepared statements for batch insertion
    db.query(insertQuery, [values], (insertErr, result) => {
      if (insertErr) {
        console.error('Error inserting new records:', insertErr);
        return res.status(500).json(insertErr);
      }
  
      console.log('Deletion and insertion of catalogue records completed.');
  
      // Return a success response
      return res.status(201).json({
        status: 201,
        message: 'Catalogue records have been deleted and new records inserted successfully.',
      });
    });
  });
  
}


// export const getUserDetails = (req, res) => {
//     console.log('reqreq',req, req.body.FieldMemberID);
//     console.log('userId', req.query.userId, req.body.userId)
//     // req.query.userId
    
//     const q = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
//     db.query(q, [req.body.FieldMemberID], (err, data) => {
//         if (data?.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         if (err) {
//             return res.status(500).json({ error: err });
//         }

//         console.log(data);
//         res.json(data); // Send the response as JSON
//     });
// };


// update api

// export const updateUserDetail = (req, res) => {
//     let { FieldMemberID, FieldMember_Firstname, FieldMember_LastName, FieldMember_EmailID, FieldMember_Role, FieldMember_Contact, FieldMember_CreatedAt, Gender, Nationality, MaritalStatus, Qualification, Date_Of_Joining,Address, Country, State, City, Pincode } = req.body;

    

//         // UPDATE USER DETAILS
//         const updateQuery = "UPDATE fieldmemberdetails SET " +
//             "FieldMember_Firstname = ?, " +
//             "FieldMember_LastName = ?, " +
//             "FieldMember_EmailID = ?, " +
//             "FieldMember_Role = ?, " +
//             "FieldMember_Contact = ?, " +
//             "FieldMember_CreatedAt = ?," +
//             "Gender = ?, " +
//             "Nationality = ?, " +
//             "MaritalStatus = ?, " +
//             "Qualification = ?, " +
//             "Address = ?, " +
//             "Date_Of_Joining=?,"+
//             "Country = ?, " +
//             "State = ?, " +
//             "City = ?, " +
//             "Pincode = ? " +
//             "WHERE FieldMemberID = ?";

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

//         console.log(updateQuery,values)
//         db.query(updateQuery, values, (err, result) => {
//             if (err) {
//                 console.log(err, values);
//                 return res.status(500).json(err);
//             }

//             console.log("User details updated successfully!");

//             // Fetch and return the updated user details
//             const updatedDataQuery = "SELECT * FROM fieldmemberdetails WHERE FieldMemberID = ?";
//             db.query(updatedDataQuery, [FieldMemberID], (err, updatedData) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).json(err);
//                 }

//                 return res.status(200).json({
//                     status: 200,
//                     data: updatedData[0],
//                     message: "User details have been updated successfully.",
//                 });
//             });
//         });
//     // });
// };






