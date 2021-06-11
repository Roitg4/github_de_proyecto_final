const db = require('../models');

exports.principal = (req, res) => {

    db.EstadoAlojamiento.findAll({
        attributes: ["id", "estado_alojamiento" ],
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
    res.status(200).send({ msg: 'OK desde BUSCAR ******* ' });
}

exports.nuevo = async (req, res) => { 

    const nuevoEstadoAlojamiento = {
        estado_alojamiento: req.body.estado_alojamiento
    }

    console.log("Antes de guardar -> DATOS REC: ",nuevoEstadoAlojamiento);

    db.EstadoAlojamiento.create(nuevoEstadoAlojamiento).then((registro) =>{

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
        estado_alojamiento: req.body.estado_alojamiento
    };

    const id = req.body.id;

    db.EstadoAlojamiento.update(registroActualizar, {
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
        await db.EstadoAlojamiento.destroy({
            where: {
              id: req.body.id
            }
          });
        res.status(200).send({ message: 'El Estado de alojamiento se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
