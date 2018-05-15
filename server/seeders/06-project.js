const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Projects', [{
            name: 'Airbus projet 1',
            group_skill_level_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'SNCF projet 3',
            group_skill_level_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Projects', null, {});
    }
};