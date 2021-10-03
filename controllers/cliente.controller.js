const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const Op = db.Sequelize.Op;

const secret_jwt = require('../config/env').SECRET_JWT;

exports.principal = (req, res) => {

    db.Cliente.findAll({
        attributes: ["id", "nombre", "apellido", "email", "dni", "telefono", "localidad", 
        "provincia", "codigo_postal"]

    }).then(registros => {

        res.status(200).send(registros);

    }).catch((err) => {

        res.status(500).send({
            msg: 'Error al recuperar registros ******* ',
            err

        });
    })
}

exports.buscar = (req, res) => {

    //Ruta de la pagina web
    const key = req.params.key;
    const value = req.params.value;

    db.Cliente.findAll({
        attributes: ["id", "nombre", "apellido", "email", "dni", "telefono", "localidad", 
        "provincia", "codigo_postal"],
        where: { [key]: { [Op.like]: `%${value}%` } },  /* "%"+value+"%" */
        order: [
            ["email", "ASC"]
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

    db.Cliente.findAll({
        attributes: ["id", "nombre", "apellido", "email", "dni", "telefono", "localidad", 
        "provincia", "codigo_postal"],
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

exports.registro = async (req, res) => {

    const passEncriptada = await bcrypt.hash(req.body.password, 12); //ENCRIPTADO DE LA CONTRASEÑA  


    const nuevoCliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: passEncriptada,
        email: req.body.email,
        dni: req.body.dni,
        telefono: req.body.telefono,
        localidad: req.body.localidad,
        provincia: req.body.provincia,
        codigo_postal: req.body.codigo_postal
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevoCliente);

    db.Cliente.create(nuevoCliente).then((registro) => {

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

exports.login = async (req, res) => {

    const cliente = await db.Cliente.findOne({
        where: { email: req.body.email }
    });

    if (cliente) {
        if (bcrypt.compareSync(req.body.password, cliente.password)) {
            // Login correcto
            const token = jwt.sign({
                id: cliente.id,
                email: req.body.email
            },
                secret_jwt,
                {
                    expiresIn: '15m'
                });

            const data = {
                token: token,
                id: cliente.id,
                email: req.body.email
            }

            res.status(200).send({ data });

        } else {
            // La contraseña no es correcta
            res.status(500).send({
                msg: 'Error en login COD: 002 '
            });
        }
    } else {
        // No exite email en la base de datos
        res.status(500).send({
            msg: 'Error en login COD: 001 '
        });
    }

}

exports.editar = (req, res) => {

    let registroActualizar = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: req.body.password,
        email: req.body.email,
        dni: req.body.dni,
        telefono: req.body.telefono,
        localidad: req.body.localidad,
        provincia: req.body.provincia,
        codigo_postal: req.body.codigo_postal
    };

    const id = req.params.id

    db.Cliente.update(registroActualizar, {
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
        await db.Cliente.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({ message: 'El Cliente se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};

