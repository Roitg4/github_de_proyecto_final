const db = require('../models');

exports.principal = (req, res) => {

    db.TarifaxTipo.findAll({
        attributes: ["id"],
        include: [{ model: db.Tarifa, attributes: ["id", "nombre", "fecha_inicio", "fecha_fin", "tarifa"]}, 
        { model: db.Alojamiento_tipo, attributes: ["id", "tipo_alojamiento"]}]
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

    db.TarifaxTipo.findAll({
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

    db.TarifaxTipo.findAll({
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

    const nuevoTarifaxTipo = {
        TarifaId: req.body.TarifaId,
        TipoAlojamientoId: req.body.TipoAlojamientoId
    }

    console.log("Antes de guardar -> DATOS REC: ",nuevoTarifaxTipo);

    db.TarifaxTipo.create(nuevoTarifaxTipo).then((registro) =>{

        res.status(200).send({ 
            msg: 'Creado correctamente ******* ',
            registro    
        });

    }).catch((err) =>{

        res.status(500).send({ 
            msg: 'Error al crear ******* ',
            err
             
        });

    });  
}

exports.editar = (req, res) => {

    let registroActualizar = {
        TarifaId: req.body.TarifaId,
        TipoAlojamientoId: req.body.TipoAlojamientoId
    };

    const id = req.params.id;

    db.TarifaxTipo.update(registroActualizar, {
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
                    msg: "ERROR EN ACTUALIZACI??N ",
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
        await db.TarifaxTipo.destroy({
            where: {
              id: req.params.id
            }
          });
        res.status(200).send({ message: 'La tabla tarifa x tipo de alojamiento se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
