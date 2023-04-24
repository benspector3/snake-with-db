// api/users/:user_id/scores/
exports.createUserScore = async (req, res) => { 
  const { Scores, body: { points }, params: {user_id} } = req;
  const score = await Scores.createUserScore(Number(user_id), points);
  if (!score) res.status(404).send({ msg: 'Unable to create score' });
  res.status(201).send(score);
}
// api/users/:user_id/scores
exports.listUserScores = async (req, res) => {
  const { Scores, params: { user_id } } = req;
  const scores = await Scores.getUserScores(user_id);
  res.send(scores);
}