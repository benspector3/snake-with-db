const userModel = require('../db/models/users');
const scoresModel = require('../db/models/scores');

const addModels = (req, res, next) => {
  req.Users = userModel;
  req.Scores = scoresModel;
  next();
}

module.exports = addModels;