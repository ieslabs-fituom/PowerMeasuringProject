import mysql from 'serverless-mysql';
const db = mysql({
  config: {
    host: 'localhost',
    port: 3308,
    database: 'power_project',
    user: 'root',
    password: ''
  }
});

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}