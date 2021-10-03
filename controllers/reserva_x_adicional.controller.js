const db = require('../models');

exports.principal = (req, res) => {

    db.ReservaxAdicional.findAll({
        attributes: ["id"],
        include: [{
            model: db.Reserva, attributes: ["id", "check_in", "check_out", "cantidad_noches", "cantidad_adultos",
                "cantidad_niños", "total_pagar", "seña", "saldo_pagar", "observacion"]
        },
        { model: db.Adicional, attributes: ["id", "tipo_adicional", "descripcion"] }]
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

    //Ruta de la pagina web
    const key = req.params.key;
    const value = req.params.value;

    db.ReservaxAdicional.findAll({
        attributes: ["id"],
        where: { [key]: { [Op.like]: `%${value}%` } },  /* "%"+value+"%" */
        order: [
            ["id", "ASC"]
        ],
    })
        .then((registros) => {
            res.status(200).send(registros);
        })
        .catch((err) => {
            res.status(500).send({
                msg: "Error en accceso a la base de datos",
                error: err.errors[0].message,
            });
        });
};

exports.buscarId = (req, res) => {
    const id = req.params.id

    db.ReservaxAdicional.findAll({
        attributes: ["id"],
        where: { id: id }

    }).then(registros => {
        res.status(200).send(registros);
    }).catch((err) => {

        res.status(500).send({
            msg: 'Error al recuperar los datos ******* ',
            err

        });
    })
};

exports.nuevo = async (req, res) => {

    const nuevoReservaAdicional = {
        ReservaId: req.body.ReservaId,
        AdicionalId: req.body.AdicionalId
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevoReservaAdicional);

    db.ReservaxAdicional.create(nuevoReservaAdicional).then((registro) => {

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
        ReservaId: req.body.ReservaId,
        AdicionalId: req.body.AdicionalId
    };

    const id = req.params.id

    db.ReservaxAdicional.update(registroActualizar, {
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
        await db.ReservaxAdicional.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).send({ message: 'La tabla reserva x adicional se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
