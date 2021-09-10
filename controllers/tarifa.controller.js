const db = require('../models');
const Op = db.Sequelize.Op;

exports.principal = (req, res) => {

    db.Tarifa.findAll({
        attributes: ["id", "nombre", "fecha_inicio", "fecha_fin", "tarifa"],
        include: [{ model: db.Moneda_tipo, attributes: ["id", "nombre", "codigo"] }]
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

    db.Tarifa.findAll({
        attributes: ["id", "nombre", "fecha_inicio", "fecha_fin", "tarifa"],
        include: [{ model: db.Moneda_tipo, attributes: ["id", "nombre", "codigo"] }],
        where: { [key]: { [Op.like]: `%${value}%` } },  /* "%"+value+"%" */
        order: [
            ["nombre", "ASC"]
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

    db.Tarifa.findAll({
        attributes: ["id", "nombre", "fecha_inicio", "fecha_fin", "tarifa"],
        include: [{ model: db.Moneda_tipo, attributes: ["id", "nombre", "codigo"] }],
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

    const nuevoTarifa = {
        nombre: req.body.nombre,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        tarifa: req.body.tarifa,
        TipoMonedaId: req.body.TipoMonedaId
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevoTarifa);

    db.Tarifa.create(nuevoTarifa).then((registro) => {

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
        nombre: req.body.nombre,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        tarifa: req.body.tarifa,
        TipoMonedaId: req.body.TipoMonedaId
    };

    const id = req.body.id;

    db.Tarifa.update(registroActualizar, {
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
        await db.Tarifa.destroy({
            where: {
                id: req.body.id
            }
        });
        res.status(200).send({ message: 'La tarifa se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
