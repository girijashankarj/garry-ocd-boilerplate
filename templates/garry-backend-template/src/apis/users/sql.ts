export const GET_USER_BY_ID = `SELECT id, name, email FROM users WHERE id = ?`;
export const INSERT_USER = `INSERT INTO users (name, email) VALUES (?, ?)`;
