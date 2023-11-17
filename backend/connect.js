import mysql from "mysql2"
let urlDb='mysql://root:eCHG1cdfHa1cfe614cbDFDhFbEF51BdF@viaduct.proxy.rlwy.net:15610/railway'
export const db = mysql.createConnection(urlDb)

// export const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "Sumit@040202",
//     database: "omni_orderlist"
// })