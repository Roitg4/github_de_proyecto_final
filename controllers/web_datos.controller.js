const db = require('../models');
const Op = db.Sequelize.Op;

exports.listaAlojamiento = (req, res) => {

  db.Alojamiento.findAll({
    attributes: ["id", "descripcion", "capacidad"],
    include: [{ model: db.Alojamiento_estado, attributes: ["id", "estado_alojamiento"] },
    { model: db.Alojamiento_tipo, attributes: ["id", "tipo_alojamiento"] }]
  }).then(registros => {

    res.status(200).send(registros);

  }).catch((err) => {

    res.status(500).send({
      msg: 'Error al recuperar los datos ******* ',
      err

    });
  })
}

exports.listaTipoAlojamiento = (req, res) => {

  db.Alojamiento_tipo.findAll({
    attributes: ["id", "tipo_alojamiento"],
  }).then(registros => {

    res.status(200).send(registros);

  }).catch((err) => {

    res.status(500).send({
      msg: 'Error al recuperar los datos ******* ',
      err

    });
  })
}

exports.alojamientoDetalle = (req, res) => {
  const id = req.params.id

  db.Alojamiento.findAll({
    attributes: ["id", "descripcion", "capacidad"],
    include: [{ model: db.Alojamiento_estado, attributes: ["id", "estado_alojamiento"] },
    { model: db.Alojamiento_tipo, attributes: ["id", "tipo_alojamiento"] }],
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

