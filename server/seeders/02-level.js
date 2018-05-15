const Sequelize = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Levels', [{
                name: 'Débutant',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Intermédiaire',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Avancé',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Expert',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Levels', null, {});
    }
};