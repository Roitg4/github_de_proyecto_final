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
db.TipoUsuario = require('./usuario_tipo')(sequelize, Sequelize); 
db.FormaPago = require('./forma_pago')(sequelize, Sequelize); 
db.Tarifa = require('./tarifa')(sequelize, Sequelize);
db.TipoMoneda = require('./moneda_tipo')(sequelize, Sequelize);
db.Cliente = require('./cliente')(sequelize, Sequelize);
db.Adicional = require('./adicional')(sequelize, Sequelize);
db.TipoAlojamiento = require('./alojamiento_tipo')(sequelize, Sequelize);
db.EstadoAlojamiento = require('./alojamiento_estado')(sequelize, Sequelize);
db.Alojamiento = require('./alojamiento')(sequelize, Sequelize);
db.TarifaxTipo = require('./tarifa_x_tipo')(sequelize, Sequelize);
db.Reserva = require('./reserva')(sequelize, Sequelize);

//RELACIONES
//USUARIOS ADMINISTRADORES
db.TipoUsuario.hasMany(db.UsuarioAdm); //Tiene muchos
db.UsuarioAdm.belongsTo(db.TipoUsuario); //Pertenece a

//TARIFA
db.TipoMoneda.hasMany(db.Tarifa);
db.Tarifa.belongsTo(db.TipoMoneda);

//ALOJAMIENTOS
db.EstadoAlojamiento.hasMany(db.Alojamiento);
db.TipoAlojamiento.hasMany(db.Alojamiento);
db.Alojamiento.belongsTo(db.EstadoAlojamiento);
db.Alojamiento.belongsTo(db.TipoAlojamiento);

//TARIFA X TIPO
db.Tarifa.hasMany(db.TarifaxTipo);
db.TipoAlojamiento.hasMany(db.TarifaxTipo);
db.TarifaxTipo.belongsTo(db.Tarifa);
db.TarifaxTipo.belongsTo(db.TipoAlojamiento);

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

// - - - - - - - - - - -

module.exports = db;