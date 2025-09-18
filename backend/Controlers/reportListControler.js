import { db } from "../connect.js";
import validator from 'validator';

export const addReportListDetail = (req, res) => {
    let {
        reportID,
        fieldMemberName,
        reportMode,
        stateName,
        firmName,
        City,
        Date_ReportList,
        reportObject,
        remark,
        fieldMemberID
    } = req.body;

    console.log("Request Body:", req.body);

    // Stringify the orderObject
    const reportObjectString = JSON.stringify(reportObject);

    // Validate data (example using validator library)
    // if (!validator.isUUID(reportID)) {
    //     return res.status(400).json({ error: "Invalid reportID." });
    // }

    const insertQuery = "INSERT INTO reportdetails (`reportID`, `fieldMemberName`, `reportMode`, `stateName`, `firmName`, `City`, `Date_ReportList`, `reportObject`, `remark`,`fieldMemberID`) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?)";

    const values = [reportID, fieldMemberName, reportMode, stateName, firmName, City, Date_ReportList, reportObjectString, remark, fieldMemberID];

    try {
        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.log(err, values);
                return res.status(500).json({ error: "Failed to save data." });
            }

            // Get the last inserted ID
            const lastInsertId = result.insertId;

            const insertedDataQuery = "SELECT * FROM reportdetails WHERE ID = ?";
            db.query(insertedDataQuery, [lastInsertId], (err, insertedData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Failed to fetch inserted data." });
                }

                console.log("Inserted data:", insertedData);

                return res.status(200).json({
                    status: 200,
                    data: insertedData,
                    message: "Report List has been created successfully.",
                });
            });
        });
    } catch (err) {
        console.error("Error adding order list detail:", err);
        return res.status(500).json({ error: "An error occurred while adding report list detail." });
    }
};


//retrive record code

export const getReportListDetail = (req, res) => {

    console.log('userId', req.query.userId)
    const userId = req.query.userId; // Retrieve the user ID from the query parameters

    const checkQuery = "SELECT * FROM reportdetails where fieldMemberID = ?";
    db.query(checkQuery, [userId], (err, data) => {
        if (err) {
            console.error("Error retrieving manual report data:", err);
            return res.status(500).json({
                status: 500,
                message: "Error retrieving manual report data.",
                error: err.message // Include the error message for debugging
            });
        }

        console.log("Manual report detail:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Manual report detail retrieved successfully."
        });
    });
};


// update api code


export const updateReportDetail = (req, res) => {
    console.log("Request Body:", req.body);

    let {
        reportID,
        fieldMemberName,
        reportMode,
        stateName,
        firmName,
        City,
        Date_ReportList,
        reportObject,
        remark,
        fieldMemberID
    } = req.body;

    // Convert orderObject to JSON string
    const reportObjectString = JSON.stringify(reportObject);

    // UPDATE USER DETAILS
    const updateQuery = "UPDATE reportdetails SET " +
        "fieldMemberName = ?, " +
        "reportMode = ?, " +
        "stateName = ?, " +
        "firmName = ?, " +
        "City = ?, " +
        "Date_ReportList = ?, " +
        "reportObject = ?, " +
        "remark = ?, " +
        "fieldMemberID = ? " +
        "WHERE reportID = ?";

    const values = [
        fieldMemberName,
        reportMode,
        stateName,
        firmName,
        City,
        Date_ReportList,
        reportObjectString,
        remark,
        fieldMemberID,
        reportID
    ];

    console.log(updateQuery, values)
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.log(err, values);
            return res.status(500).json(err);
        }

        console.log("Report details updated successfully!");

        // Fetch and return the updated user details
        const updatedDataQuery = "SELECT * FROM reportdetails WHERE reportID = ?";
        db.query(updatedDataQuery, [reportID], (err, updatedData) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json({
                status: 200,
                data: updatedData[0],
                message: "Report details have been updated successfully.",
            });
        });
    });
};










