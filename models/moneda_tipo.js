const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const TipoMoneda = sequelize.define('TipoMoneda', {

        nombre: { 
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        codigo: { 
            
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true
            
        }

    }, {});

    return TipoMoneda;
}