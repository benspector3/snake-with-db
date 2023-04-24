const express = require('express');
const addModels = require('./middleware/add-models')
const userControllers = require('./controllers/user-controllers');
const scoreControllers = require('./controllers/score-controllers');

const router = express.Router();
router.use(addModels);

router.post('/api/users/', userControllers.create);
router.get('/api/users/', userControllers.list);
router.get('/api/users/:username', userControllers.find);
router.delete('/api/users/:id', userControllers.destroy);
router.patch('/api/users/:id', userControllers.update);

router.post('/api/users/:user_id/scores', scoreControllers.createUserScore);
router.get('/api/users/:user_id/scores', scoreControllers.listUserScores);

module.exports = router;