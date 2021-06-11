const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Adicional = sequelize.define('Adicional', {

        tipo_adicional:{
            type: DataTypes.STRING(),
            required: true
        },
        descripcion:{
            type: DataTypes.STRING(),
            required: true
        }

    }, {});

    return Adicional;
}