const Type_skill = require('../models').Type_skill;

module.exports = {
    list(req, res) {
        return Type_skill
            .findAll({})
            .then((type_skills) => res.status(200).send(type_skills))
            .catch((error) => res.status(400).send(error));
    }
};