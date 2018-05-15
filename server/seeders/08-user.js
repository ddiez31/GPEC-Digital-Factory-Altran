const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            type_user_id: 1,
            surname: 'admin',
            password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            type_user_id: 2,
            surname: 'consultant',
            password: bcrypt.hashSync('consultant', bcrypt.genSaltSync(10)),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};