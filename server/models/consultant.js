const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Consultant = sequelize.define('Consultant', {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            set(val) {
                this.setDataValue('last_name', val.toUpperCase());
            },
            allowNull: false
        }
    });

    Consultant.associate = (models) => {
        Consultant.hasMany(models.Group_skill_level, { foreignKey: 'group_skill_level_id' });
        // Consultant.belongsTo(models.Contribution, {foreignKey: 'contribution_id'});
    };
    return Consultant;
};