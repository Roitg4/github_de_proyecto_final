const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const UsuarioAdm = sequelize.define('UsuarioAdm', {

        nombre:{
            type: DataTypes.STRING(),
            required: true
        },
        password: {
            type: DataTypes.STRING(),
            required: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(120),
            required: true,
            allowNull: false,
            unique: true
        }

    }, {});

    return UsuarioAdm;
}