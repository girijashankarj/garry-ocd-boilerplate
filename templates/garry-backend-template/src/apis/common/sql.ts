/* eslint-disable */
export const SQL = {
  GET_USER_BY_ID: 'SELECT id, name, email FROM users WHERE id = :id',
  CREATE_USER: 'INSERT INTO users (name, email) VALUES (:name, :email)',
  UPDATE_USER: 'UPDATE users SET name = :name, email = :email WHERE id = :id',
  DELETE_USER: 'DELETE FROM users WHERE id = :id',
};
