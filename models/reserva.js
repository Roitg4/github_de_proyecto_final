const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define('Reserva', {

        check_in:{
            type: DataTypes.DATE(),
            required: true
        },
        check_out: {
            type: DataTypes.DATE(),
            required: true
        },
        cantidad_noches: {
            type: DataTypes.DECIMAL(),
            required: true
        },
        cantidad_adultos: {
            type: DataTypes.DECIMAL(),
            required: true
        },
        cantidad_niños: {
            type: DataTypes.DECIMAL(),
            required: true
        },
        total_pagar: {
            type: DataTypes.DECIMAL(),
            required: true
        },
        seña: {
            type: DataTypes.DECIMAL(),
            required: true
        },
        saldo_pagar: {
            type: DataTypes.DECIMAL(),
            required: true
        },
        observacion: {
            type: DataTypes.STRING(),
            required: true
        }

    }, {});

    return Reserva;
}