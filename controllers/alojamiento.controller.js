const db = require('../models');
const Op = db.Sequelize.Op;

exports.principal = (req, res) => {

    db.Alojamiento.findAll({
        attributes: ["id", "descripcion", "capacidad"],
        include: [{ model: db.Alojamiento_estado, attributes: ["id", "estado_alojamiento"] },
        { model: db.Alojamiento_tipo, attributes: ["id", "tipo_alojamiento"] }]
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

    db.Alojamiento.findAll({
        attributes: ["id", "descripcion", "capacidad"],
        /* include: [{ model: db.Alojamiento_estado, attributes: ["id", "estado_alojamiento"] },
        { model: db.Alojamiento_tipo, attributes: ["id", "tipo_alojamiento"] }], */
        where: { [key]: { [Op.like]: `%${value}%` } },  /* "%"+value+"%" */
        order: [
            ["capacidad", "ASC"]
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

    db.Alojamiento.findAll({
        attributes: ["id", "descripcion", "capacidad"],
        include: [{ model: db.Alojamiento_estado, attributes: ["id", "estado_alojamiento"] },
        { model: db.Alojamiento_tipo, attributes: ["id", "tipo_alojamiento"] }],
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

    const nuevoAlojamiento = {
        descripcion: req.body.descripcion,
        capacidad: req.body.capacidad,
        EstadoAlojamientoId: req.body.EstadoAlojamientoId,
        TipoAlojamientoId: req.body.TipoAlojamientoId
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevoAlojamiento);

    db.Alojamiento.create(nuevoAlojamiento).then((registro) => {

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
        descripcion: req.body.descripcion,
        capacidad: req.body.capacidad,
        EstadoAlojamientoId: req.body.EstadoAlojamientoId,
        TipoAlojamientoId: req.body.TipoAlojamientoId
    };

    const id = req.params.id;

    db.Alojamiento.update(registroActualizar, {
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
    console.log(req.params.id)
    try {
        await db.Alojamiento.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({ message: 'El Alojamiento se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
