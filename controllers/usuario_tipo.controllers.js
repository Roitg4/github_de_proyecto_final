const db = require("../models");

exports.principal = (req, res) => {
  db.Usuario_tipo.findAll({
    attributes: ["id", "tipo_usuario"],
    order: [
      ["tipo_usuario", "DESC"]

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

  db.Usuario_tipo.findAll({
    attributes: ["id", "tipo_usuario"],
    where: { [key]: value},
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

exports.nuevo = (req, res) => {
  const nuevoRegistro = {
    tipo_usuario: req.body.tipo_usuario
  };

  db.Usuario_tipo.create(nuevoRegistro)
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

  db.Usuario_tipo.update(registroActualizar, {
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
      await db.Usuario_tipo.destroy({
          where: {
            id: req.body.id
          }
        });
      res.status(200).send({ message: 'El Tipo de Usuario se elimino correctamente' });
  } catch (error) {
      res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
  }

};