const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Group_skills_levels', [{
            skill_id: 1,
            level_id: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            skill_id: 2,
            level_id: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            skill_id: 3,
            level_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Group_skills_levels', null, {});
    }
};