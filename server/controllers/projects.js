const Project = require('../models').Project;
const Group_skill_level = require('../models').Group_skill_level;

module.exports = {
    create(req, res) {
        return Project
            .create({
                name: req.body.name,
                group_skill_level_id: req.body.group_skill_level_id
            })
            .then(project => res.status(201).send(project))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return Project.findAll({
            include: [{
                model: Group_skill_level
            }]
        }).then((projects) => res.status(200).send(projects)).catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return Project
            .findById(req.params.projectId, {
                include: [{
                    model: Group_skill_level
                }]
            })
            .then((project) => {
                if (!project) {
                    return res
                        .status(404)
                        .send({ message: 'Project Not Found' });
                }
                return res
                    .status(200)
                    .send(project);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Project
            .findById(req.params.projectId, {})
            .then(project => {
                if (!project) {
                    return res
                        .status(404)
                        .send({ message: 'Project Not Found' });
                }
                return project
                    .update({
                        name: req.body.name,
                        group_skill_level_id: req.body.group_skill_level_id
                    })
                    .then(() => res.status(200).send(project))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return Project
            .findById(req.params.projectId)
            .then(project => {
                if (!project) {
                    return res
                        .status(400)
                        .send({ message: 'Project Not Found' });
                }
                return project
                    .destroy()
                    .then(() => res.status(204).send(project))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

};