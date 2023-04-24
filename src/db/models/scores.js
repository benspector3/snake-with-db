const knex = require('./knex');

exports.createUserScore = async (user_id, points) => {
  const date = (new Date()).toLocaleDateString();
  try {
    const result = await knex.raw(`
      INSERT INTO user_scores (user_id, score, date)
      VALUES (?, ?, ?)
      RETURNING *;
    `, [user_id, points, date]);
    return result.rows[0];
  }
  catch (err) {
    console.error(err);
    return null;
  }
}

exports.getUserScores = async (user_id) => {
  try {
    const result = await knex.raw(`
      SELECT user_scores.id AS "score_id", user_scores.score, date
      FROM user_scores
      JOIN users
        ON users.id = user_scores.user_id
      WHERE user_id = ?
      ORDER BY score DESC
      LIMIT 5
    `, [user_id]);
    return result.rows;
  }
  catch (err) {
    console.error(err);
    return null;
  }
}

