import mysql from "mysql2"

export const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Sumit@040202",
    database: "omni_orderlist"
})