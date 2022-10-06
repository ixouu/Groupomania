require("dotenv").config();
/*** importer le package jsonwebtoken pour vérifier les tokens ***/
const jwt = require("jsonwebtoken");

const getAuthUser = (req) => {
    /*** récupération du token dans le header de la requête d'autorisation et la récupération aprés l'espace du deuxieme élément du tableau qui est le token ***/
    const token = req.headers.authorization.split(" ")[1];
    /*** vérification et décodage du token avec la clé de sécurité ***/
    const decodedToken = jwt.verify(token, process.env.SECRETKEY)
    const userEmail = decodedToken.UserInfo.email
    return userEmail;
};

module.exports = getAuthUser;