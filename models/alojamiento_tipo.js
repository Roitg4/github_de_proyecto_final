const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const TipoAlojamiento = sequelize.define('TipoAlojamiento', {

        tipo_alojamiento:{
            type: DataTypes.STRING(),
            required: true
        }

    }, {});

    return TipoAlojamiento;
}