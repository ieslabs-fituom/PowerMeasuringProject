// import mysql from 'serverless-mysql';
import mysql from 'mysql2/promise';


// const db = mysql({
//   config: {
//     // host: process.env.MYSQL_HOST,
//     // port: process.env.MYSQL_PORT,
//     // database: process.env.MYSQL_DATABASE,
//     // user: process.env.MYSQL_USER,
//     // password: process.env.MYSQL_PASSWORD

//     host: '192.248.11.35',
//     port: 3306,
//     database: 'powerProjectDB',
//     user: 'root',
//     password: 'password',

//   }
// });

const connection = await mysql.createConnection({
  host: '192.248.11.35',
    port: 3306,
    database: 'powerProjectDB',
    user: 'username',
    password: 'password',
});

// A simple SELECT query
// try {
//   const [results, fields] = await connection.query(
//     'SELECT * FROM `device`'
//   );

//   console.log(results); // results contains rows returned by server
//   console.log(fields); // fields contains extra meta data about results, if available
// } catch (err) {
//   console.log(err);
// }

export default async function excuteQuery({ query, values }) {
  try {
    console.log(query, values);
    const results = await connection.query(query, values);
    //await connection.end();
    console.log(results);
    return results[0];
  } catch (error) {
    return { error };
  }
}

// export default async function excuteQuery({ query, values }) {
//   try {
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }