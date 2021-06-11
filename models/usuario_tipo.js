const {DataTypes} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const TipoUsuario = sequelize.define('TipoUsuario', {

        tipo_usuario:{
            type: DataTypes.STRING(),
            required: true
        }

    }, {});

    return TipoUsuario;
}