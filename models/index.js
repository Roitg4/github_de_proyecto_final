const dbConfig = require('../config/db.config');
//const dbConfig = require('../config/db_server.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.port
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//MODELOS DEL DER
db.UsuarioAdm = require('./usuario_admin')(sequelize, Sequelize);
db.Usuario_tipo = require('./usuario_tipo')(sequelize, Sequelize); 
db.FormaPago = require('./forma_pago')(sequelize, Sequelize); 
db.Tarifa = require('./tarifa')(sequelize, Sequelize);
db.Moneda_tipo = require('./moneda_tipo')(sequelize, Sequelize);
db.Cliente = require('./cliente')(sequelize, Sequelize);
db.Adicional = require('./adicional')(sequelize, Sequelize);
db.Alojamiento_tipo = require('./alojamiento_tipo')(sequelize, Sequelize);
db.Alojamiento_estado = require('./alojamiento_estado')(sequelize, Sequelize);
db.Alojamiento = require('./alojamiento')(sequelize, Sequelize);
db.TarifaxTipo = require('./tarifa_x_tipo')(sequelize, Sequelize);
db.Reserva = require('./reserva')(sequelize, Sequelize);
db.ReservaxAdicional = require('./reserva_x_adicional')(sequelize, Sequelize);

//RELACIONES
//USUARIOS ADMINISTRADORES
db.Usuario_tipo.hasMany(db.UsuarioAdm); //Tiene muchos
db.UsuarioAdm.belongsTo(db.Usuario_tipo); //Pertenece a

//TARIFA
db.Moneda_tipo.hasMany(db.Tarifa);
db.Tarifa.belongsTo(db.Moneda_tipo);

//ALOJAMIENTOS
db.Alojamiento_estado.hasMany(db.Alojamiento);
db.Alojamiento_tipo.hasMany(db.Alojamiento);
db.Alojamiento.belongsTo(db.Alojamiento_estado);
db.Alojamiento.belongsTo(db.Alojamiento_tipo);

//TARIFA X TIPO
db.Tarifa.hasMany(db.TarifaxTipo);
db.Alojamiento_tipo.hasMany(db.TarifaxTipo);
db.TarifaxTipo.belongsTo(db.Tarifa);
db.TarifaxTipo.belongsTo(db.Alojamiento_tipo);

//RESERVAS
db.UsuarioAdm.hasMany(db.Reserva);
db.Cliente.hasMany(db.Reserva);
db.Alojamiento.hasMany(db.Reserva);
db.FormaPago.hasMany(db.Reserva);
//------
db.Reserva.belongsTo(db.UsuarioAdm);
db.Reserva.belongsTo(db.Cliente);
db.Reserva.belongsTo(db.Alojamiento);
db.Reserva.belongsTo(db.FormaPago);

// RESERVAS X ADICIONAL
db.Reserva.hasMany(db.ReservaxAdicional);
db.Adicional.hasMany(db.ReservaxAdicional);
db.ReservaxAdicional.belongsTo(db.Reserva);
db.ReservaxAdicional.belongsTo(db.Adicional)

// - - - - - - - - - - -

module.exports = db;