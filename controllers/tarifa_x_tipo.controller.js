const db = require('../models');

exports.principal = (req, res) => {

    db.TarifaxTipo.findAll({
        attributes: ["id"],
        include: [{ model: db.Tarifa, attributes: ["id", "nombre", "fecha_inicio", "fecha_fin", "tarifa"]}, 
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

    const tarifaid = await db.Tarifa.findOne({
        where: { id: 1 }
    });
    
    const tipoAlojamiento = await db.TipoAlojamiento.findOne({
        where: { id: 2 }
    });

    const nuevoTarifaxTipo = {
        TarifaId: tarifaid.id,
        TipoAlojamientoId: tipoAlojamiento.id
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
        TarifaId: tarifaid.id,
        TipoAlojamientoId: tipoAlojamiento.id
    };

    const id = req.body.id;

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
        await db.TarifaxTipo.destroy({
            where: {
              id: req.body.id
            }
          });
        res.status(200).send({ message: 'La tabla tarifa x tipo de alojamiento se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
