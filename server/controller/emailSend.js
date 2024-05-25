
import db from '../database_Config/db.js';

export const sendEmail = (req, res) => {
    const { SmtpUserName, SmtpPassword, userId } = req.body;
    console.log(userId);

    // Query to check if the SMTP details already exist for the given user_id
    const checkQuery = `SELECT * FROM user_smtp_details WHERE user_id = ?`;

    db.query(checkQuery, [userId], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error checking existing SMTP details:', checkErr);
            res.status(500).json({ success: false, message: 'Error checking existing SMTP details' });
            return;
        }

        if (checkResults.length > 0) {
            // SMTP details already exist for this user_id
            res.status(400).json({ success: false, message: 'SMTP details already exist for this user. Please update instead.' });
        } else {
            // SMTP details do not exist, proceed with insertion
            const insertQuery = `INSERT INTO user_smtp_details (user_id, smtp_user, smtp_password) VALUES (?, ?, ?)`;

            db.query(insertQuery, [userId, SmtpUserName, SmtpPassword], (insertErr, insertResults) => {
                if (insertErr) {
                    console.error('Error inserting SMTP details:', insertErr);
                    res.status(500).json({ success: false, message: 'Error inserting SMTP details' });
                    return;
                }
                res.json({ success: true, message: 'SMTP details added successfully' });
            });
        }
    });
};
