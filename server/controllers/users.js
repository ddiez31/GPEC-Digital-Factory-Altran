const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models').User;
const Type_user = require('../models').Type_user;
SECRET_TOKEN = 'gpecdigitalfactoryaltran';

module.exports = {
    create(req, res) {
        return User
            .create({
                surname: req.body.surname,
                password: req.body.password,
                type_user_id: req.body.type_user_id
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return User.findAll({
            include: [{
                model: Type_user
            }]
        }).then((users) => res.status(200).send(users)).catch((error) => res.status(400).send(error));
    },

    retrieve(req, res) {
        return User
            .findById(req.params.userId, {
                include: [{
                    model: Type_user
                }]
            })
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .send({ message: 'User Not Found' });
                }
                return res
                    .status(200)
                    .send(user);
            })
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return User
            .findById(req.params.userId, {})
            .then(user => {
                if (!user) {
                    return res
                        .status(404)
                        .send({ message: 'User Not Found' });
                }
                return user
                    .update({
                        surname: req.body.surname,
                        password: req.body.password,
                        type_user_id: req.body.type_user_id
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    destroy(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res
                        .status(400)
                        .send({ message: 'User Not Found' });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send(user))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    login(req, res) {
        return User
            .findOne({
                where: {
                    surname: req.body.surname
                }
            })
            .then((user) => {
                if (!user) {
                    return res
                        .status(403)
                        .send({ message: 'User Not Found' });
                }
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({
                        user: user
                    }, SECRET_TOKEN, { expiresIn: '8h' });
                    return res
                        .status(200)
                        .json({ token: token });
                };
                return res
                    .status(403)
                    .send({ message: 'User Not Found' });
            })
            .catch((error) => res.status(400).send(error));
    }
};