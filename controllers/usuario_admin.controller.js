const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');

const secret_jwt = require('../config/env').SECRET_JWT;

exports.principal = (req, res) => {

    db.UsuarioAdm.findAll({
        attributes: ["id", "nombre", "email"],
        include: [{ model: db.Tipo_Usuario, attributes: ["id", "tipo_usuario"] }]
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
    const key = req.params.key
    const value = req.params.value

    db.UsuarioAdm.findAll({
        where: { [key]: value },
        atributes: ['id']

    }).then(registros => {
        res.status(200).send(registros);
    }).catch((err) => {

        res.status(500).send({
            msg: 'Error al recuperar los datos ******* ',
            err

        });
    })
}

exports.registro = async (req, res) => {

    const passEncriptada = await bcrypt.hash(req.body.password, 12); //ENCRIPTADO DE LA CONTRASEÑA  

    const nuevoUsuario = {
        nombre: req.body.nombre,
        password: passEncriptada,
        email: req.body.email,
        TipoUsuarioId: req.body.TipoUsuarioId
    }

    console.log("Antes de guardar -> DATOS REC: ", nuevoUsuario);

    db.UsuarioAdm.create(nuevoUsuario).then((registro) => {

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

exports.verifyToken = async (req, res) => {

    let token = req.body.token;
    let verificarToken;

    try {
        console.log('secret_jwt:',secret_jwt)
        verificarToken = jwt.verify(token, secret_jwt);

    } catch (error) {
        error.statusCode = 401;
        //response 401
        console.log(error);
        res.status(401).send({ error: '401' });
    }

    console.log("RESULTADO VERIFY ", verificarToken, token)

    token = jwt.sign({
        id: verificarToken.id,
        email: verificarToken.email
    },
        secret_jwt,
        {
            expiresIn: '1h'
        });

    const data = {
        token: token,
        id: verificarToken.id,
        email: verificarToken.email
    }
    res.status(200).send({ data });
}

exports.login = async (req, res) => {

    const usuario = await db.UsuarioAdm.findOne({
        where: { email: req.body.email }
    });

    if (usuario) {
        if (bcrypt.compareSync(req.body.password, usuario.password)) {
            // Login correcto
            const token = jwt.sign({
                id: usuario.id,
                email: req.body.email
            },
                secret_jwt,
                {
                    expiresIn: '1h'
                });

            const data = {
                token: token,
                id: usuario.id,
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
        password: req.body.password,
        email: req.body.email,
        TipoUsuarioId: req.body.TipoUsuarioId
    };

    const id = req.body.id;

    db.UsuarioAdm.update(registroActualizar, {
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
        await db.UsuarioAdm.destroy({
            where: {
                id: req.body.id
            }
        });
        res.status(200).send({ message: 'El Usuario se elimino correctamente' });
    } catch (error) {
        res.status(500).send({ message: 'No se pudo efectuar la accion de eliminar', error });
    }

};

