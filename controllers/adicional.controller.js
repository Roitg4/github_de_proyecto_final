const db = require('../models');
const Op = db.Sequelize.Op;

exports.principal = (req, res) => {

    db.Adicional.findAll({
        attributes: ["id", "tipo_adicional", "descripcion"]
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

    db.Adicional.findAll({
        attributes: ["id", "tipo_adicional", "descripcion"],
        where: { [key]: { [Op.like]: `%${value}%` } },  /* "%"+value+"%" */
        order: [
            ["tipo_adicional", "ASC"]
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

    db.Adicional.findAll({
        attributes: ["id","tipo_adicional", "descripcion"],
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

    const nuevoAdicional = {
        tipo_adicional: req.body.tipo_adicional,
        descripcion: req.body.descripcion
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevoAdicional);

    db.Adicional.create(nuevoAdicional).then((registro) => {

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
        tipo_adicional: req.body.tipo_adicional,
        descripcion: req.body.descripcion
    };

    const id = req.params.id

    db.Adicional.update(registroActualizar, {
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
        await db.Adicional.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({ message: 'El adicional se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
