import { db } from "../connect.js";
import validator from 'validator';

export const addOrderListDetail = (req, res) => {
    let {
        orderListID,
        orderNo,
        fieldMemberName,
        orderMode,
        stateName,
        firmName,
        City,
        Date_OrderList,
        orderObject,
        remark,
        fieldMemberID
    } = req.body;

    console.log("Request Body:", req.body);

    // Stringify the orderObject
    const orderObjectString = JSON.stringify(orderObject);

    // Validate data (example using validator library)
    if (!validator.isUUID(orderListID)) {
        return res.status(400).json({ error: "Invalid orderListID." });
    }

    const insertQuery = "INSERT INTO manualorderdetail (`orderListID`, `orderNo`, `fieldMemberName`, `orderMode`, `stateName`, `firmName`, `City`, `Date_OrderList`, `orderObject`, `remark`,`fieldMemberID`) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?,?)";

    const values = [orderListID, orderNo, fieldMemberName, orderMode, stateName, firmName, City, Date_OrderList, orderObjectString, remark, fieldMemberID];

    try {
        db.query(insertQuery, values, (err, result) => {
            if (err) {
                console.log(err, values);
                return res.status(500).json({ error: "Failed to save data." });
            }

            // Get the last inserted ID
            const lastInsertId = result.insertId;

            const insertedDataQuery = "SELECT * FROM manualorderdetail WHERE ID = ?";
            db.query(insertedDataQuery, [lastInsertId], (err, insertedData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Failed to fetch inserted data." });
                }

                console.log("Inserted data:", insertedData);

                return res.status(200).json({
                    status: 200,
                    data: insertedData,
                    message: "order List has been created successfully.",
                });
            });
        });
    } catch (err) {
        console.error("Error adding order list detail:", err);
        return res.status(500).json({ error: "An error occurred while adding order list detail." });
    }
};


export const getOrderListDetail = (req, res) => {
    // alert("klkhhlkll")

    console.log('userId', req.query.userId)
    const userId = req.query.userId; // Retrieve the user ID from the query parameters

    const checkQuery = "SELECT * FROM manualorderdetail where fieldMemberID = ?";
    db.query(checkQuery, [userId], (err, data) => {
        if (err) {
            console.error("Error retrieving manual order data:", err);
            return res.status(500).json({
                status: 500,
                message: "Error retrieving manual order data.",
                error: err.message // Include the error message for debugging
            });
        }

        console.log("Manual order detail:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Manual order detail retrieved successfully."
        });
    });
};


// update api code

// export const updateOrderDetail = (req, res) => {
//     // alert("klkhhlkll")
//     console.log("Request Body:", req.body); // Add this line to log the request body

//     let { orderListID, orderNo, fieldMemberName, orderMode, firmName, City, Date_OrderList, orderObject, remark, fieldMemberID } = req.body;

//     // UPDATE USER DETAILS
//     const updateQuery = "UPDATE manualorderdetail SET " +
//         "orderNo = ?, " +
//         "fieldMemberName = ?, " +
//         "orderMode = ?, " +
//         "firmName = ?, " +
//         "City = ?, " +
//         "Date_OrderList = ?, " +
//         "orderObject = ?, " +
//         "remark = ?, " +
//         "fieldMemberID = ? " +
//         "WHERE orderListID = ?";

//     const values = [
//         orderNo,
//         fieldMemberName,
//         orderMode,
//         firmName,
//         City,
//         Date_OrderList,
//         orderObject,
//         remark,
//         fieldMemberID,
//         orderListID
//     ];

//     console.log(updateQuery, values)
//     db.query(updateQuery, values, (err, result) => {
//         if (err) {
//             console.log(err, values);
//             return res.status(500).json(err);
//         }

//         console.log("Order details updated successfully!");

//         // Fetch and return the updated user details
//         const updatedDataQuery = "SELECT * FROM manualorderdetail WHERE orderListID = ?";
//         db.query(updatedDataQuery, [orderListID], (err, updatedData) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json(err);
//             }

//             return res.status(200).json({
//                 status: 200,
//                 data: updatedData[0],
//                 message: "Order details have been updated successfully.",
//             });
//         });
//     });
// };


export const updateOrderDetail = (req, res) => {
    console.log("Request Body:", req.body);

    let { orderListID, orderNo, fieldMemberName, orderMode,stateName, firmName, City, Date_OrderList, orderObject, remark, fieldMemberID } = req.body;

    // Convert orderObject to JSON string
    const orderObjectString = JSON.stringify(orderObject);

    // UPDATE USER DETAILS
    const updateQuery = "UPDATE manualorderdetail SET " +
        "orderNo = ?, " +
        "fieldMemberName = ?, " +
        "orderMode = ?, " +
        "stateName = ?, " +
        "firmName = ?, " +
        "City = ?, " +
        "Date_OrderList = ?, " +
        "orderObject = ?, " +
        "remark = ?, " +
        "fieldMemberID = ? " +
        "WHERE orderListID = ?";

    const values = [
        orderNo,
        fieldMemberName,
        orderMode,
        stateName,
        firmName,
        City,
        Date_OrderList,
        orderObjectString, // Use the converted JSON string here
        remark,
        fieldMemberID,
        orderListID
    ];

    console.log(updateQuery, values)
    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.log(err, values);
            return res.status(500).json(err);
        }

        console.log("Order details updated successfully!");

        // Fetch and return the updated user details
        const updatedDataQuery = "SELECT * FROM manualorderdetail WHERE orderListID = ?";
        db.query(updatedDataQuery, [orderListID], (err, updatedData) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return res.status(200).json({
                status: 200,
                data: updatedData[0],
                message: "Order details have been updated successfully.",
            });
        });
    });
};










