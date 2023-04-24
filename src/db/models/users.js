const knex = require('./knex');

exports.createUser = async (username) => {
  try {
    const result = await knex.raw(`
      INSERT INTO users (username)
      VALUES (?)
      RETURNING *;
    `, [username]);
    return result.rows[0];
  }
  catch (err) {
    console.error(err);
    return null;
  }
}

exports.getUsers = async () => {
  try {
    const result = await knex.raw(`
      SELECT *
      FROM users;
    `)
    return result.rows;
  }
  catch (err) {
    console.error(err);
    return null;
  }
}
exports.findUser = async (username) => {
  try {
    const result = await knex.raw(`
      SELECT *
      FROM users
      WHERE username=?;
    `, [username]);
    return result.rows[0];
  }
  catch (err) {
    console.error(err);
    return null;
  }
}
exports.updateUsername = async (user_id, newName) => {
  try {
    const result = await knex.raw(`
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *;
    `, [newName, user_id]);
    return result.rows[0];
  }
  catch (err) {
    console.error(err);
    return null;
  }
}

exports.deleteUser = async (user_id) => {
  try {
    const result = await knex.raw(`
      DELETE FROM users
      WHERE id=?
      RETURNING *;
    `, [user_id]);
    return result.rows[0];
  }
  catch (err) {
    console.error(err);
    return null;
  }
}