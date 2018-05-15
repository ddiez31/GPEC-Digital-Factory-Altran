const Level = require('../models').Level;

module.exports = {
    list(req, res) {
        return Level
            .findAll({})
            .then((levels) => res.status(200).send(levels))
            .catch((error) => res.status(400).send(error));
    }
};