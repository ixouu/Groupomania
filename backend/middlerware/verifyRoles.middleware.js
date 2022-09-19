// Define if there is a role

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log(req.roles)
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log('allowed Roles '+ rolesArray)
        console.log('user role ' + req.roles)
        // Define if the roles sent by jwt and return the role(s) found
        const result = req.roles.map(role => rolesArray.includes(role)).find(value => value === true);
        if(!result){
            return res.sendStatus(401)
        }
        next();
    }
}

module.exports = verifyRoles