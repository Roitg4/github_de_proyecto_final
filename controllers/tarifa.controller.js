const db = require('../models');

exports.principal = (req, res) => {

    db.Tarifa.findAll({
        attributes: ["id", "nombre", "fecha_inicio", "fecha_fin", "tarifa"],
        include: [{ model: db.TipoMoneda, attributes: ["id", "tipo_moneda"] }]
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

    const tipoMoneda = await db.TipoMoneda.findOne({
        where: { codigo: 'ARS' }
    });

    const nuevoTarifa = {
        nombre: req.body.nombre,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        tarifa: req.body.tarifa,
        TipoMonedaId: tipoMoneda.id
    }

    console.log("Antes de guardar -> DATOS REC: ",nuevoTarifa);

    db.Tarifa.create(nuevoTarifa).then((registro) =>{

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
        nombre: req.body.nombre,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        tarifa: req.body.tarifa,
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
