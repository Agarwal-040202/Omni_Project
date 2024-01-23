import { db } from "../connect.js";

// price list 1 csk_phillips

export const getPriceList1Detail = (req, res) => {
    
    
    const checkQuery = "SELECT * FROM csk_phillips";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error Price List 1 data.",
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


// price list 2 panphillips
export const getPriceList2Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM panphillips";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error panphillips retrieving data.",
            });
        }
       
        console.log("Price List 2 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price List panphillips data retrieved successfully.",
        });
    });
};

// cskslotted price list 3

export const getPriceList3Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskslotted";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskslotted retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskslotted List 3 data retrieved successfully.",
        });
    });
}

// panslotted price list 4

export const getPriceList4Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM panslotted";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error panslotted retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price panslotted List 3 data retrieved successfully.",
        });
    });
}

// cskslottedwood price list 5

export const getPriceList5Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskslottedwood";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskslottedwood retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskslottedwood data retrieved successfully.",
        });
    });
}

// cskphillipwood price list 6

export const getPriceList6Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipwood";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillipwood retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillipwood data retrieved successfully.",
        });
    });
}

// drywall_410 price list 7

export const getPriceList7Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM drywall_410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error drywall_410 retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price drywall_410 data retrieved successfully.",
        });
    });
}


// cskphillipsds410 price list 8

export const getPriceList8Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipsds410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillipsds410 retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillipsds410 data retrieved successfully.",
        });
    });
}

// panphillipsds410 price list 9

export const getPriceList9Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM panphillipsds410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error panphillipsds410 retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price panphillipsds410 data retrieved successfully.",
        });
    });
}

// hexsdsepdmwasher410 price list 10

export const getPriceList10Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM hexsdsepdmwasher410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error hexsdsepdmwasher410 retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price hexsdsepdmwasher410 data retrieved successfully.",
        });
    });
}

// hexsdsmetalbondedepdmwasher410 price list 11

export const getPriceList11Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM hexsdsmetalbondedepdmwasher410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error hexsdsmetalbondedepdmwasher410 retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price hexsdsmetalbondedepdmwasher410 data retrieved successfully.",
        });
    });
}

// cskphillipchipboard price list 12

export const getPriceList12Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipchipboard";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillipchipboard retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillipchipboard data retrieved successfully.",
        });
    });
}

// omnicutchipboard price list 13

export const getPriceList13Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM omnicutchipboard";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error omnicutchipboard retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price omnicutchipboard data retrieved successfully.",
        });
    });
}

// fullcut410 price list 14

export const getPriceList14Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM fullcut410";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error fullcut410 retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price fullcut410 data retrieved successfully.",
        });
    });
}


// combiwithwasherss price list 15

export const getPriceList15Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM combiwithwasherss";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error combiwithwasherss retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price combiwithwasherss data retrieved successfully.",
        });
    });
}

// cskslottedmachinebsw price list 16

export const getPriceList16Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskslottedmachinebsw";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskslottedmachinebsw retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskslottedmachinebsw data retrieved successfully.",
        });
    });
}

// cskslottedmachinemm price list 17

export const getPriceList17Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskslottedmachinemm";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskslottedmachinemm retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskslottedmachinemm data retrieved successfully.",
        });
    });
}

// cskphillipmachinemm price list 18

export const getPriceList18Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipmachinemm";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillipmachinemm retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillipmachinemm data retrieved successfully.",
        });
    });
}


// zinkchipboard price list 19

export const getPriceList19Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM zinkchipboard";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error zinkchipboard retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price zinkchipboard data retrieved successfully.",
        });
    });
}

// blackgypsum price list 20

export const getPriceList20Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM blackgypsum";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error blackgypsum retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price blackgypsum data retrieved successfully.",
        });
    });
}

// whitechromefinish price list 21

export const getPriceList21Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM whitechromefinish";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error whitechromefinish retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price whitechromefinish data retrieved successfully.",
        });
    });
}

// combiwithwasherms price list 22

export const getPriceList22Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM combiwithwasherms";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error combiwithwasherms retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price combiwithwasherms data retrieved successfully.",
        });
    });
}

// carrigebolt12mmnut price list 23

export const getPriceList23Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM carrigebolt12mmnut";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error carrigebolt12mmnut retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price carrigebolt12mmnut data retrieved successfully.",
        });
    });
}

// carrigebolt14mmnut price list 24

export const getPriceList24Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM carrigebolt14mmnut";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error carrigebolt14mmnut retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price carrigebolt14mmnut data retrieved successfully.",
        });
    });
}

// nailsheadless price list 25

export const getPriceList25Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM nailsheadless";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error nailsheadless retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price nailsheadless data retrieved successfully.",
        });
    });
}


// nailsroundhead price list 26

export const getPriceList26Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM nailsroundhead";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error nailsroundhead retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price nailsroundhead data retrieved successfully.",
        });
    });
}

// cskphillipantique price list 27

export const getPriceList27Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipsatique";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillipsatique retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillipsatique data retrieved successfully.",
        });
    });
}

// cskphillip rose gold price list 28

export const getPriceList28Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipsrosegold";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillipsrosegold retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillipsrosegold data retrieved successfully.",
        });
    });
}

// cskphillips autoblack finish price list 29

export const getPriceList29Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipsautoblackfinish";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillips auto black finish retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillips auto black finish data retrieved successfully.",
        });
    });
}

// fullcut 410 antique price list 30

export const getPriceList30Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM fullcut410antique";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error fullcut410 antique retrieving data.",
            });
        }
       
        console.log("Price List 3 data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price fullcut410 antique data retrieved successfully.",
        });
    });
}

// kitchenbasketscrew price list 31

export const getPriceList31Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM kitchenbasketscrew";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error kitchenbasketscrew retrieving data.",
            });
        }
       
        console.log("kitchenbasketscrew data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price kitchenbasketscrew data retrieved successfully.",
        });
    });
}

// cskphillipgolden price list 32

export const getPriceList32Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM cskphillipgolden";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error cskphillipgolden retrieving data.",
            });
        }
       
        console.log("cskphillipgolden data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price cskphillipgolden data retrieved successfully.",
        });
    });
}


// drywall410antique price list 33

export const getPriceList33Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM drywall410antique";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error drywall410antique retrieving data.",
            });
        }
       
        console.log("drywall410antique data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price drywall410antique data retrieved successfully.",
        });
    });
}

// drywall410golden price list 34

export const getPriceList34Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM drywall410golden";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error drywall410golden retrieving data.",
            });
        }
       
        console.log("drywall410golden data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price drywall410golden data retrieved successfully.",
        });
    });
}

// fullcut410golden price list 35

export const getPriceList35Detail = (req, res) => {
    
    // CHECK IF USER EXISTS
    const checkQuery = "SELECT * FROM fullcut410golden";
    db.query(checkQuery, (err, data) => {

        if (err) {
            console.log("Error:", err);
            return res.status(500).json({
                status: 500,
                message: "Error fullcut410golden retrieving data.",
            });
        }
       
        console.log("fullcut410golden data:", data);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Price fullcut410golden data retrieved successfully.",
        });
    });
}

