const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Skills', [{
            name: 'Angular',
            type_skill_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'React',
            type_skill_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Node.js',
            type_skill_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Express',
            type_skill_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'SQL',
            type_skill_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Skills', null, {});
    }
};