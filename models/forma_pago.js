const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const FormaPago = sequelize.define('FormaPago', {

        forma_pago:{
            type: DataTypes.STRING(),
            required: true
        }

    }, {});

    return FormaPago;
}