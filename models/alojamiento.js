const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Alojamiento = sequelize.define('Alojamiento', {

        descripcion:{
            type: DataTypes.STRING(),
            required: true
        },
        capacidad:{
            type: DataTypes.DECIMAL(), //INT 
            required: true
        }

    }, {});

    return Alojamiento;
}