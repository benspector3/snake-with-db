exports.create = async (req, res) => {
  const { Users, body } = req;
  const user = await Users.createUser(body.username);
  if (!user) res.status(404).send('Unable to create user');
  res.status(201).send(user);
}
exports.list = async (req, res) => {
  const { Users } = req;
  const users = await Users.getUsers();
  res.send(users);
}
exports.find = async (req, res) => {
  const { Users, params: { username } } = req;
  const user = await Users.findUser(username);
  if (!user) res.status(404).send({ msg: 'No User Found' });
  res.send(user);
}
exports.update = async (req, res) => {
  const { Users, params: { id }, body } = req;
  const updatedUser = await Users.updateUsername(Number(id), body.username);
  if (!updatedUser) res.status(404).send('Unable to update user');
  res.send(updatedUser);
}
exports.destroy = async (req, res) => {
  const { Users, params: { id } } = req;
  const deletedUser = await Users.deleteUser(Number(id));
  if (!deletedUser) res.status(404).send('Unable to delete user');
  res.send(deletedUser);
}