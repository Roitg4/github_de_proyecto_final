const db = require('../models');

exports.principal = (req, res) => {

    db.Alojamiento.findAll({
        attributes: ["id", "descripcion", "capacidad"],
        include: [{ model: db.EstadoAlojamiento, attributes: ["id", "estado_alojamiento"]}, 
        { model: db.TipoAlojamiento, attributes: ["id", "tipo_alojamiento"]}]
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

    const estadoAloj = await db.EstadoAlojamiento.findOne({
        where: { estado_alojamiento: 'Limpio' }
    });
    const tipoAloj = await db.TipoAlojamiento.findOne({
        where: { tipo_alojamiento: 'Cabaña' }
    });

    const nuevoAlojamiento = {
        descripcion: req.body.descripcion,
        capacidad: req.body.capacidad,
        EstadoAlojamientoId: estadoAloj.id,
        TipoAlojamientoId: tipoAloj.id
    }

    console.log("Antes de guardar -> DATOS REC: ",nuevoAlojamiento);

    db.Alojamiento.create(nuevoAlojamiento).then((registro) =>{

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
        descripcion: req.body.descripcion,
        capacidad: req.body.capacidad
    };

    const id = req.body.id;

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

    try {
        await db.Alojamiento.destroy({
            where: {
              id: req.body.id
            }
          });
        res.status(200).send({ message: 'El Alojamiento se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
