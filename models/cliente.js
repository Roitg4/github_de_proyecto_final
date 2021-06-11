const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('Cliente', {

        nombre:{
            type: DataTypes.STRING(),
            required: true
        },
        apellido:{
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
        },
        dni:{
            type: DataTypes.STRING(),
            required: true
        },
        telefono:{
            type: DataTypes.STRING(),
            required: true
        },
        localidad:{
            type: DataTypes.STRING(),
            required: true
        },
        provincia:{
            type: DataTypes.STRING(),
            required: true
        },
        codigo_postal:{
            type: DataTypes.STRING()
        }


    }, {});

    return Cliente;
}