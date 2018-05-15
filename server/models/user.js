const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            set(val) {
                this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(10)));
            },
            allowNull: false
        }
    });

    User.associate = (models) => {
        User.belongsTo(models.Type_user, { foreignKey: 'type_user_id' });
    };
    return User;
};