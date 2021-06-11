const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const TarifaxTipo = sequelize.define('TarifaxTipo', {

       
    }, {});

    return TarifaxTipo;
}