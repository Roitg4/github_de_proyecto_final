const jwt = require('jsonwebtoken');
const secret_jwt = require('../config/env').SECRET_JWT;

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    console.log('***')
    if (!authHeader) {
        const error = new Error("nNo Authorization code");
        error.statusCode = 401;
        throw error;
    }

    //Cabecera identificada... obtener token
    // "Bearer BFVEJ489HE8IBJERNDS8UB9WEUFHB3"
    const token = authHeader.split(' ')[1];
    let verificarToken;

    try{
        verificarToken = jwt.verify(token, secret_jwt);
        req.usuarioLogueado = verificarToken;
    }catch(error){
        error.statusCode = 401;
        throw error;
    }
    next();

}

