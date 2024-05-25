import db from "../database_Config/db.js";
import nodemailer from 'nodemailer';

export const checkFestivalForToday = () => {
  const query = `
      SELECT fl.festival_id, fl.festival_name, fl.festival_date
      FROM festival_list fl
      WHERE fl.festival_date = CURDATE();
  `;

  db.query(query, (error, results) => {
      if (error) {
          console.error('Error executing query:', error);
          return;
      }

      if (results.length === 0) {
          console.log('No festival for today.');
      } else {
          console.log('Festival for today:');
          let totalEmailsSent = 0; // Counter for emails sent
          let emailPromises = []; // Array to store promises for email sending

          results.forEach(festival => {
              const { festival_id, festival_name, festival_date } = festival;
              console.log(`Festival ID: ${festival_id}, Name: ${festival_name}, Date: ${festival_date}`);

              // Query festival emails for the current festival ID
              const festivalEmailsQuery = `
                SELECT festival_subject, festival_message
                FROM festival_emails
                WHERE festival_id = ?;
              `;

              db.query(festivalEmailsQuery, [festival_id], (emailError, emailResults) => {
                  if (emailError) {
                      console.error('Error fetching festival emails:', emailError);
                      return;
                  }

                  if (emailResults.length === 0) {
                      console.log('No emails found for this festival.');
                  } else {
                      console.log('Festival Emails:');
                      emailResults.forEach(email => {
                          const { festival_subject, festival_message } = email;
                          console.log(`Subject: ${festival_subject}, Message: ${festival_message}`);

                          // Query user and client details
                          const userClientQuery = `
                            SELECT uc.user_id, uc.first_name, uc.last_name, uc.email AS client_email, 
                                   u.user_name, u.user_email, s.smtp_user, s.smtp_password
                            FROM userclients uc
                            JOIN user u ON uc.user_id = u.user_id
                            LEFT JOIN user_smtp_details s ON uc.user_id = s.user_id;
                          `;

                          db.query(userClientQuery, (clientError, clientResults) => {
                              if (clientError) {
                                  console.error('Error fetching user and client details:', clientError);
                                  return;
                              }

                              if (clientResults.length === 0) {
                                  console.log('No users with clients found.');
                              } else {
                                  console.log('User and Client Details:');
                                  clientResults.forEach(client => {
                                      const { user_id, user_name, user_email, client_email, smtp_user, smtp_password } = client;

                                      // Check if SMTP credentials are present
                                      if (!smtp_user || !smtp_password) {
                                          console.log(`Skipping email for user ${user_name} (ID: ${user_id}) due to missing SMTP credentials.`);
                                          return;
                                      }

                                      console.log(`User ID: ${user_id}, User Name: ${user_name}, User Email: ${user_email}, Client Email: ${client_email}, SMTP User: ${smtp_user}, SMTP Password: ${smtp_password}`);

                                      // Create transporter using the user's SMTP details
                                      let transporter = nodemailer.createTransport({
                                          host: 'smtp.gmail.com', // or your SMTP server
                                          port: 587,
                                          secure: false, // true for 465, false for other ports
                                          auth: {
                                              user: smtp_user,
                                              pass: smtp_password
                                          }
                                      });

                                      // Define email options
                                      let mailOptions = {
                                          from: smtp_user, // sender address
                                          to: client_email, // list of receivers
                                          subject: festival_subject, // Subject line
                                          text: festival_message, // plain text body
                                          html: `<p>${festival_message}</p>` // html body
                                      };

                                      // Send email and add promise to the array
                                      emailPromises.push(
                                          new Promise((resolve, reject) => {
                                              transporter.sendMail(mailOptions, (error, info) => {
                                                  if (error) {
                                                      console.error(`Error sending email to ${client_email}:`, error);
                                                      reject(error);
                                                  } else {
                                                      console.log(`Email sent to ${client_email}: ${info.response}`);
                                                      totalEmailsSent++; // Increment the counter
                                                      resolve();
                                                  }
                                              });
                                          })
                                      );
                                  });
                              }
                          });
                      });
                  }
              });
          });

          // Wait for all emails to be sent and then log the total count
          Promise.all(emailPromises).then(() => {
              console.log(`Total emails sent: ${totalEmailsSent}`);
          }).catch((err) => {
              console.error('Error in sending some emails:', err);
          });
      }
  });
};
