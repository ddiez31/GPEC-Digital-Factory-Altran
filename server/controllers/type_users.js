const Type_user = require('../models').Type_user;

module.exports = {
  list(req, res) {
    return Type_user
      .findAll({})
      .then((type_users) => res.status(200).send(type_users))
      .catch((error) => res.status(400).send(error));
  }
};