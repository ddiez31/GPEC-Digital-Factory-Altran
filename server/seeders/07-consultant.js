const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Consultants', [{
            first_name: 'Luke',
            last_name: 'Skywalker',
            group_skill_level_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            first_name: 'Leia',
            last_name: 'Organa',
            group_skill_level_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Consultants', null, {});
    }
};