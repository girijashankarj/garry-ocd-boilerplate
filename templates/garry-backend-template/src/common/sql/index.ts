/* eslint-disable */
export const USER_QUERIES = {
  SELECT_BY_ID: 'SELECT * FROM users WHERE id = :id;',
  INSERT: 'INSERT INTO users (name, email) VALUES (:name, :email);',
  UPDATE: 'UPDATE users SET name = :name, email = :email WHERE id = :id;',
  DELETE: 'DELETE FROM users WHERE id = :id;',
};
