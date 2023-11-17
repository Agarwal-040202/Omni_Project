import { db } from "../connect.js";

export const getPriceList1Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM fullcut_ss_410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error retrieving shopkeeper data.",
            });
        }
       
        console.log("Price List 1 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price List 1 data retrieved successfully.",
        });
    });
};


// price list 2
export const getPriceList2Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM drywall_410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error retrieving shopkeeper data.",
            });
        }
       
        console.log("Price List 2 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price List 2 data retrieved successfully.",
        });
    });
};

// price list 3

export const getPriceList3Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM csk_phillips";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error retrieving shopkeeper data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price List 3 data retrieved successfully.",
        });
    });
}