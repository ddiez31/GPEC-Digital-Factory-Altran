const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Type_skills', [{
            type: 'Front-end',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            type: 'Back-end',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Type_skills', null, {});
    }
};