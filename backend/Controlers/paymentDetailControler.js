import { db } from "../connect.js";
import validator from 'validator';

export const addPaymentDetail = (req, res) => {
    let {
        paymentdetailID,
        fieldMemberName,
        firmName,
        City,
        Date_PaymentDetail,
        paymentObject,
        fieldMemberID
    } = req.body;

    console.log("Request Body:", req.body);

    // Stringify the orderObject
    const paymentObjectString = JSON.stringify(paymentObject);

    const insertQuery = "INSERT INTO paymentdetails (`paymentdetailID`, `fieldMemberName`, `firmName`, `City`, `Date_PaymentDetail`, `paymentObject`,`fieldMemberID`) VALUES (?, ?, ?, ?, ?,?,?)";

    const values = [paymentdetailID, fieldMemberName, firmName, City, Date_PaymentDetail, paymentObjectString, fieldMemberID];

    try {
        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.log(err, values);
                return res.status(500).json({ error: "Failed to save data." });
            }

            // Get the last inserted ID
            const lastInsertId = result.insertId;

            const insertedDataQuery = "SELECT * FROM paymentdetails WHERE ID = ?";
            db.query(insertedDataQuery, [lastInsertId], (err, insertedData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Failed to fetch inserted data." });
                }

                console.log("Inserted data:", insertedData);

                return res.status(200).json({
                    status: 200,
                    data: insertedData,
                    message: "Payment Details has been created successfully.",
                });
            });
        });
    } catch (err) {
        console.error("Error adding order list detail:", err);
        return res.status(500).json({ error: "An error occurred while adding report list detail." });
    }
};


//retrive record code

export const getPaymentDetail = (req, res) => {

    console.log('userId', req.query.userId)
    const userId = req.query.userId; // Retrieve the user ID from the query parameters

    const checkQuery = "SELECT * FROM paymentdetails where fieldMemberID = ?";
    db.query(checkQuery, [userId], (err, data) => {
        if (err) {
            console.error("Error retrieving manual report data:", err);
            return res.status(500).json({
                status: 500,
                message: "Error retrieving manual report data.",
                error: err.message // Include the error message for debugging
            });
        }

        console.log("payment detail:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Manual report detail retrieved successfully."
        });
    });
};


// update api code


export const updatePaymentDetail = (req, res) => {
    console.log("Request Body:", req.body);

    let {
        paymentdetailID,
        fieldMemberName,
        firmName,
        City,
        Date_PaymentDetail,
        paymentObject,
        fieldMemberID
    } = req.body;

    // Convert orderObject to JSON string
    const paymentObjectString = JSON.stringify(paymentObject);

    // UPDATE USER DETAILS
    const updateQuery = "UPDATE paymentdetails SET " +
        "fieldMemberName = ?, " +
        "firmName = ?, " +
        "City = ?, " +
        "Date_PaymentDetail = ?, " +
        "paymentObject = ?, " +
        "fieldMemberID = ? " +
        "WHERE paymentdetailID = ?";

    const values = [
        fieldMemberName,
        firmName,
        City,
        Date_PaymentDetail,
        paymentObjectString,
        fieldMemberID,
        paymentdetailID
    ];

    console.log(updateQuery, values)
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.log(err, values);
            return res.status(500).json(err);
        }

        console.log("Payment details updated successfully!");

        // Fetch and return the updated user details
        const updatedDataQuery = "SELECT * FROM paymentdetails WHERE paymentdetailID = ?";
        db.query(updatedDataQuery, [paymentdetailID], (err, updatedData) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json({
                status: 200,
                data: updatedData[0],
                message: "Payment details have been updated successfully.",
            });
        });
    });
};










