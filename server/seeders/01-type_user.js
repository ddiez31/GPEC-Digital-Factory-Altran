const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Type_users', [{
                type: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                type: 'consultant',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Type_users', null, {});
    }
};