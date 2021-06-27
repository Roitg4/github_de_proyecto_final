const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const ReservaxAdicional = sequelize.define('ReservaxAdicional', {

       
    }, {});

    return ReservaxAdicional;
}