module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Group_skills_levels', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            skill_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Skills',
                    key: 'id'
                },
                allowNull: false
            },
            level_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Levels',
                    key: 'id'
                },
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Group_skills_levels');
    }
};