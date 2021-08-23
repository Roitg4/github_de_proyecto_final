const db = require("../models");
const Op = db.Sequelize.Op;

exports.principal = (req, res) => {
  db.Tipo_Usuario.findAll({
    attributes: ["id", "tipo_usuario"],
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

exports.buscar = (req, res) => {

  //Ruta de la pagina web
  const key = req.params.key;
  const value = req.params.value;

  db.Tipo_Usuario.findAll({
    attributes: ["id", "tipo_usuario"],
    where: { [key]: { [Op.like]: `%${value}%` } },  /* "%"+value+"%" */
    order: [
      ["tipo_usuario", "ASC"]
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

  db.Tipo_Usuario.findAll({
    attributes: ["id", "tipo_usuario"],
    where: { id: id }

  }).then(registros => {
    res.status(200).send(registros);
  }).catch((err) => {

    res.status(500).send({
      msg: 'Error al recuperar los datos ******* ',
      err

    });
  })
}

exports.nuevo = (req, res) => {
  const nuevoRegistro = {
    tipo_usuario: req.body.tipo_usuario
  };

  db.Tipo_Usuario.create(nuevoRegistro)
    .then((reg) => {
      res.status(200).send({
        msg: "OK creado correctamente ",
        registro: reg,
      });
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error en la carga ",
        error: err.errors[0].message,
      });
    });
};


exports.editar = (req, res) => {

  let registroActualizar = {
    tipo_usuario: req.body.tipo_usuario
  };

  const id = req.body.id;

  db.Tipo_Usuario.update(registroActualizar, {
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
    await db.Tipo_Usuario.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send({ message: 'El Tipo de Usuario se elimino correctamente' });
  } catch (error) {
    res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
  }

};