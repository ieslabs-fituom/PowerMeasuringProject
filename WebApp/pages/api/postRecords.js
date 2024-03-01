import { createConnection } from 'mysql';

export default async function handler(req, res) {
  var api_key_original = "lukepramo221#"
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { api_key, device_id, start_time, end_time } = req.body;
    const connection = createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'power_project',
    });

    connection.connect();

    const query = `INSERT INTO records (device_id, start_time, end_time) VALUES (?, ?, ?)`;
    const values = [device_id, start_time, end_time];

    if (api_key==api_key_original){
        connection.query(query, values, (error, results) => {

            if (error) {
              console.error('Error inserting data into MySQL:', error.message);
              res.status(500).json({ message: 'Internal Server Error' });
            } else {
              console.log('Data inserted into MySQL:', results);
              res.status(201).json({ message: 'Data saved successfully' });
            }
            connection.end();
          });
    }else{
        res.status(401).json({ message: 'Invalid API Key!' });
    }
      
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
