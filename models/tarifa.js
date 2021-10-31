const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Tarifa = sequelize.define('Tarifa', {

        nombre:{
            type: DataTypes.STRING(),
            required: true
        },
        fecha_inicio: {
            type: DataTypes.DATE(),
            required: true
        },
        fecha_fin: {
            type: DataTypes.DATE(),
            required: true
        },
        tarifa: {
            type: DataTypes.STRING,
            required: true
        }

    }, {});

    return Tarifa;
}