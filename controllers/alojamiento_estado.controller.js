const db = require('../models');
const Op = db.Sequelize.Op;

exports.principal = (req, res) => {

    db.Alojamiento_estado.findAll({
        attributes: ["id", "estado_alojamiento"],
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

    db.Alojamiento_estado.findAll({
        attributes: ["id", "estado_alojamiento"],
        where: { [key]: { [Op.like]: `%${value}%` } },  /* "%"+value+"%" */
        order: [
            ["estado_alojamiento", "ASC"]
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

    db.Alojamiento_estado.findAll({
        attributes: ["id", "estado_alojamiento"],
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

    const nuevoEstadoAlojamiento = {
        estado_alojamiento: req.body.estado_alojamiento
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevoEstadoAlojamiento);

    db.Alojamiento_estado.create(nuevoEstadoAlojamiento).then((registro) => {

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
        estado_alojamiento: req.body.estado_alojamiento
    };

    const id = req.body.id;

    db.Alojamiento_estado.update(registroActualizar, {
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
        await db.Alojamiento_estado.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({ message: 'El Estado de alojamiento se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
