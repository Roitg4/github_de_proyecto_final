const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Control de urls que acceden a nuestra API
const corsOptions = {
    origin: [ "https://localhost:4000", "http://localhost" ]
}

app.use(express.json()); //Anteriormente BOODYPARSER
app.use(cors(corsOptions));

// MOTOR DB
            //{alter: true}
const db = require('./models/index');
db.sequelize.sync(  ).then((result) => {
    console.log('DB sincronizada OK!');
})
.catch((err) => {
    console.log('ERROR DB al sincronizar', err)
});

// MIDDLEWARE
const auth = require('./middleware/auth'); 

//RUTAS
//RUTAS DEL DER
const UsuarioAdmRoutes = require('./routes/usuario_admin.routes');
const TipoRoutes= require('./routes/usuario_tipo.routes');
const FormaRoutes = require('./routes/forma_pago.routes');
const Tarifa = require('./routes/tarifa.routes');
const TipoMoneda = require('./routes/moneda_tipo.routes');
const Cliente = require('./routes/cliente.routes');
const Adicional = require('./routes/adicional.routes');
const TipoAlojamiento = require('./routes/alojamiento_tipo.routes');
const EstadoAlojamiento = require('./routes/alojamiento_estado.routes');
const Alojamiento = require('./routes/alojamiento.routes');
const Tarifa_X_Tipo = require('./routes/tarifa_x_tipo.routes');
const Reserva = require('./routes/reserva.routes');

app.use('/usuario_admin', UsuarioAdmRoutes);
app.use('/tipo_usuario', TipoRoutes);
app.use('/forma_pago', FormaRoutes);
app.use('/tarifa', Tarifa);
app.use('/tipo_moneda', TipoMoneda);
app.use('/cliente', Cliente);
app.use('/adicional', Adicional);
app.use('/tipo_alojamiento', TipoAlojamiento);
app.use('/estado_alojamiento', EstadoAlojamiento);
app.use('/alojamiento', Alojamiento);
app.use('/tarifa_x_tipo', Tarifa_X_Tipo);
app.use('/reservas', Reserva);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Api en puerto:", PORT)
});