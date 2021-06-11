const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const EstadoAlojamiento = sequelize.define('EstadoAlojamiento', {

        estado_alojamiento:{
            type: DataTypes.STRING(),
            required: true
        }

    }, {});

    return EstadoAlojamiento;
}