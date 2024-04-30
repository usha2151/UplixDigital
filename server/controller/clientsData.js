import db from "../database_Config/db.js";
import xlsx from 'node-xlsx';
import fs from 'fs';

export const UserClients = (req, res) => {
    if (req.file && req.body.userId) {
        console.log(req.body.userId);
        const workbook = xlsx.parse(req.file.buffer);
        // Assuming the first sheet contains the data
        const sheet = workbook[0].data;

        const headers = sheet[0];
        const data = sheet.slice(1);
        const clientsData = data.map(row => {
            let client = {};
            headers.forEach((header, index) => {
                client[header] = row[index];
            });
            return client;
        });
        
        // Add userId to each client data object
        clientsData.forEach(client => {
            client.userId = req.body.userId;
        });

        // Insert clients data into the database
        db.query('INSERT INTO userclients (user_id, first_name, last_name, email) VALUES ?', [clientsData.map(client => [client.userId, client.firstName, client.lastName, client.email])], (err, result) => {
            if (err) {
                console.error('Error inserting data into database:', err);
                res.status(500).json({ success: false, message: 'Error inserting data into database' });
            } else {
                console.log('Data inserted successfully');
                res.status(200).json({ success: true, message: 'Data inserted successfully' });
            }
        });
    } else {
        console.log("File or userId not provided");
        res.status(400).json({ success: false, message: 'File or userId not provided' });
    }
};
