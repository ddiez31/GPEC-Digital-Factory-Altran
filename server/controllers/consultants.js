const Consultant = require('../models').Consultant;
const Group_skill_level = require('../models').Group_skill_level;

module.exports = {
    create(req, res) {
        return Consultant
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                group_skill_level_id: req.body.group_skill_level_id
            })
            .then(onsultant => res.status(201).send(consultant))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Consultant.findAll({
            include: [{
                model: Group_skill_level
            }]
        }).then((consultants) => res.status(200).send(consultants)).catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Consultant
            .findById(req.params.consultantId, {
                include: [{
                    model: Group_skill_level
                }]
            })
            .then((consultant) => {
                if (!consultant) {
                    return res
                        .status(404)
                        .send({ message: 'Consultant Not Found' });
                }
                return res
                    .status(200)
                    .send(consultant);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Consultant
            .findById(req.params.consultantId, {})
            .then(consultant => {
                if (!consultant) {
                    return res
                        .status(404)
                        .send({ message: 'Consultant Not Found' });
                }
                return consultant
                    .update({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        type_consultant_id: req.body.type_consultant_id
                    })
                    .then(() => res.status(200).send(consultant))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return Consultant
            .findById(req.params.consultantId)
            .then(consultant => {
                if (!consultant) {
                    return res
                        .status(400)
                        .send({ message: 'Consultant Not Found' });
                }
                return consultant
                    .destroy()
                    .then(() => res.status(204).send(consultant))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

};