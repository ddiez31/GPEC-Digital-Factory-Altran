const Skill = require('../models').Skill;
const Type_skill = require('../models').Type_skill;

module.exports = {
    create(req, res) {
        return Skill
            .create({
                name: req.body.name,
                type_skill_id: req.body.type_skill_id
            })
            .then(skill => res.status(201).send(skill))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Skill.findAll({
            include: [{
                model: Type_skill
            }]
        }).then((skills) => res.status(200).send(skills)).catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Skill
            .findById(req.params.skillId, {})
            .then(skill => {
                if (!skill) {
                    return res
                        .status(404)
                        .send({ message: 'Skill Not Found' });
                }
                return skill
                    .update({
                        name: req.body.name,
                        type_skill_id: req.body.type_skill_id
                    })
                    .then(() => res.status(200).send(skill))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return Skill
            .findById(req.params.skillId)
            .then(skill => {
                if (!skill) {
                    return res
                        .status(400)
                        .send({ message: 'Skill Not Found' });
                }
                return skill
                    .destroy()
                    .then(() => res.status(204).send(skill))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

};