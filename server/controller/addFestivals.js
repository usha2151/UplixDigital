import db from "../database_Config/db.js";

export const addFestivals = (req,res) => {
    const { date, name, title } = req.body;

    const status_id = 1;

    const query = 'INSERT INTO festival_list (festival_name, festival_date, festival_title, status_id) VALUES (?, ?, ?, ?)';
    const values = [name, date, title, status_id];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error adding festival:', err);
        res.status(500).json({ message: 'Failed to add festival' });
      } else {
        console.log('Festival added successfully!');
        res.status(200).json({ message: 'Festival added successfully' });
      }
    });
 
}