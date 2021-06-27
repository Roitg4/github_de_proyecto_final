const { Reserva } = require('../models');
const db = require('../models');

exports.principal = (req, res) => {

    db.Reserva.findAll({
        attributes: ["id", "check_in", "check_out", "cantidad_noches", "cantidad_adultos", "cantidad_niños",
            "total_pagar", "seña", "saldo_pagar", "observacion"],
        include: [{ model: db.UsuarioAdm, attributes: ["id", "nombre", "email"] },
        { model: db.Cliente, attributes: ["id", "email"] },
        { model: db.Alojamiento, attributes: ["id", "descripcion", "capacidad"] },
        { model: db.FormaPago, attributes: ["id", "forma_pago"] }]
    }).then(registros => {

        res.status(200).send(registros);

    }).catch((err) => {

        res.status(500).send({
            msg: 'Error al recuperar los datos ******* ',
            err

        });
    })
}

exports.buscar = (req, res) => {
    const key = req.params.key
    const value = req.params.value

    db.Reserva.findAll({
        where: {[key]: value},
        atributes: ['id']

    }).then(registros =>{
        res.status(200).send(registros);
    }).catch((err) => {

        res.status(500).send({
            msg: 'Error al recuperar los datos ******* ',
            err

        });
    })
}

exports.nuevo = async (req, res) => {

    const nuevaReserva = {

        UsuarioAdmId: req.body.UsuarioAdmId,
        ClienteId: req.body.ClienteId,
        AlojamientoId: req.body.AlojamientoId,
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        cantidad_noches: req.body.cantidad_noches,
        cantidad_adultos: req.body.cantidad_adultos,
        cantidad_niños: req.body.cantidad_niños,
        total_pagar: req.body.total_pagar,
        seña: req.body.seña,
        saldo_pagar: req.body.saldo_pagar,
        FormaPagoId: req.body.FormaPagoId,
        observacion: req.body.observacion
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevaReserva);

    db.Reserva.create(nuevaReserva).then((registro) => {

        res.status(200).send({
            msg: 'Creado correctamente ******* ',
            registro
        });

    }).catch((err) => {

        res.status(500).send({
            msg: 'Error al crear ******* ',
            err

        });

    });
}

exports.editar = (req, res) => {

    let registroActualizar = {
        UsuarioAdmId: req.body.UsuarioAdmId,
        ClienteId: req.body.ClienteId,
        AlojamientoId: req.body.AlojamientoId,
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        cantidad_noches: req.body.cantidad_noches,
        cantidad_adultos: req.body.cantidad_adultos,
        cantidad_niños: req.body.cantidad_niños,
        total_pagar: req.body.total_pagar,
        seña: req.body.seña,
        saldo_pagar: req.body.saldo_pagar,
        FormaPagoId: req.body.FormaPagoId,
        observacion: req.body.observacion
    };

    const id = req.body.id;

    db.Reserva.update(registroActualizar, {
        where: { id: id },
    })
        .then((cant) => {
            if (cant == 1) {
                res.status(200).send({
                    msg: "OK actualizado correctamente ",
                    registro: registroActualizar,
                });
            } else {
                res.status(500).send({
                    msg: "ERROR EN ACTUALIZACIÓN ",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                msg: "Error en la carga ",
                error: err.errors
            });
        });
};

exports.eliminar = async (req, res) => {

    try {
        await db.Reserva.destroy({
            where: {
                id: req.body.id
            }
        });
        res.status(200).send({ message: 'La Reserva  se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
