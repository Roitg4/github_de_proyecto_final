const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Control de urls que acceden a nuestra API
const corsOptions = {
    origin: [ "http://localhost:4000", "http://localhost" ]
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
const Usuario_Admin = require('./routes/usuario_admin.routes');
const Tipo_usuario= require('./routes/tipo_usuario.routes');
const Forma_pago = require('./routes/forma_pago.routes');
const Tarifa = require('./routes/tarifa.routes');
const Moneda_tipo = require('./routes/moneda_tipo.routes');
const Cliente = require('./routes/cliente.routes');
const Adicional = require('./routes/adicional.routes');
const Alojamiento_tipo = require('./routes/alojamiento_tipo.routes');
const Alojamiento_estado = require('./routes/alojamiento_estado.routes');
const Alojamiento = require('./routes/alojamiento.routes');
const Tarifa_X_Tipo = require('./routes/tarifa_x_tipo.routes');
const Reserva = require('./routes/reserva.routes');
const Reserva_X_Adicional = require('./routes/reserva_x_adcional.routes');


app.use('/usuario-admin', Usuario_Admin);
app.use('/tipo-usuario', Tipo_usuario);
app.use('/forma-pago', auth, Forma_pago);
app.use('/tarifa', auth, Tarifa);
app.use('/tipo-moneda', auth, Moneda_tipo);
app.use('/cliente', Cliente);
app.use('/adicional', auth, Adicional);
app.use('/alojamiento-tipo', auth, Alojamiento_tipo);
app.use('/alojamiento-estado', auth, Alojamiento_estado);
app.use('/alojamiento', auth, Alojamiento);
app.use('/tarifa-x-tipo', auth, Tarifa_X_Tipo);
app.use('/reservas', auth, Reserva);
app.use('/reserva-x-adicional', auth, Reserva_X_Adicional);

//Web 
//Accesos get publicos
//Consultas

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Api en puerto:", PORT)
});