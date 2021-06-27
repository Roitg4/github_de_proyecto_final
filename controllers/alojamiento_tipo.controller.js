const db = require('../models');

exports.principal = (req, res) => {

    db.Alojamiento_tipo.findAll({
        attributes: ["id", "tipo_alojamiento" ],
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
    const key = req.params.key
    const value = req.params.value

    db.Alojamiento_tipo.findAll({
        where: {[key]: value},
        atributes: ['id']

    }).then(registros =>{
        res.status(200).send(registros);
    }).catch((err) => {

        res.status(500).send({
            msg: 'Error al recuperar los datos ******* ',
            err

        });
    })
}

exports.nuevo = async (req, res) => { 

    const nuevoTipoAlojamiento = {
        tipo_alojamiento: req.body.tipo_alojamiento
    }

    console.log("Antes de guardar -> DATOS REC: ",nuevoTipoAlojamiento);

    db.Alojamiento_tipo.create(nuevoTipoAlojamiento).then((registro) =>{

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
        tipo_alojamiento: req.body.tipo_alojamiento
    };

    const id = req.body.id;

    db.Alojamiento_tipo.update(registroActualizar, {
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
        await db.Alojamiento_tipo.destroy({
            where: {
              id: req.body.id
            }
          });
        res.status(200).send({ message: 'El Tipo de alojamiento se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};
