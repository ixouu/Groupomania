const UserModel = require('../models/userSchema');

// import the secret key
const secretKey = process.env.SECRETKEY;

//import bcrypt
const bcrypt = require('bcrypt');

// import validator
const validator = require('validator');

// import jwt
const jwt = require('jsonwebtoken')

// Middleware who catch errors Async function
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}
// function that hides emails
function hideEmails(email) {
    const startOfEmail = email.slice(0, 2)
    const displayEmailChar = email.replace(/[a-zA-Z.0-9]/g, '*')
    return displayEmailChar.replace('**', startOfEmail)
}

// function that Encrypt password
const hashPassword = async (password, saltRounds) =>{
    try{
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt);
    } catch (error){
        return console.log(error)
    }
};

// middleware signup , user doesn't exist yet
exports.signUp = catchAsync (async (req, res, next) => {
    
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(403).json({
            message : 'Email and password are required'
        })
    }
    // verifies if the firstName and lastName fields contains only letter and not empty
    if( !validator.isLength( req.body.firstName, { min: 2, max: 55 }) ||
        !validator.isLength( req.body.lastName, { min: 2,  max: 55 }) ){
        return res.status(403).json({ message : 'firstName or/and lastName is/are too short' })
    }
    // verifies if the firstName and lastName fields are strings
    if (typeof(req.body.firstName) != 'string' || typeof(req.body.lastName) != 'string' ){
        return res.status(403).json({ message : 'firstName or/and lastName format(s) is/are not correct' })
    }
    // verifies if the firstName and lastName fields contains only letters
    if( !validator.isAlpha(req.body.firstName) ||
        !validator.isAlpha(req.body.lastName)){
        return res.status(403).json({ message : 'firstName or/and lastName must contain only letters' })
    }
    // verifies is the email field is an email
    if( !validator.isEmail(req.body.email)) {
        return res.status(403).json({ message: 'email format is not correct' })
    }
    // verifies if the password is a strong password
    if( !validator.isStrongPassword(req.body.password)) {
        return res.status(403).json({ message: 'password not strong enough' });
    }
    // Verifies if passwords are the same before Encrypting them
    if (req.body.password !== req.body.passwordConfirm){
        return res.status(403).json({ message : 'passwords does not match'});
    }else {
    let hideEmail = hideEmails(req.body.email);
    const emailIsExisting = await UserModel.find({ email: req.body.email});
    // Verifies if the email is not already existing in the DB
    if (emailIsExisting.length !== 0) {
        return res.status(409).json({ message: 'Can not create new User' });
    }
    else {
        const hash = await hashPassword(req.body.password, 10);
        const confirmPwdHash = await hashPassword(req.body.passwordConfirm)
        await UserModel.create({
                firstName: req.body.firstName,
                lastName : req.body.lastName,
                email: req.body.email,
                password: hash,
                passwordConfirm : confirmPwdHash,
                hiddenEmail: hideEmail,
                roles : {
                    "User" : 2001
                }
        });
        await res.status(201).json({
            status : 'success'
        })
    }}
});

// middleware login
exports.login = catchAsync (async (req,res,next) =>{
   const {email, password} = req.body;
    // check de request body
    if(!email || !password){
       return res.status(403).json({
           message : 'Email and password are required'
       })
   }
    // find the user with his email
   const foundUser = UserModel.findOne({ email});
    foundUser.getFilter();
    const user= await foundUser.exec();
   if (!user) {
       return res.status(400).json({
           message : "User or email are incorrect"
       })
   }
    // verifying the password
   const match = await bcrypt.compare(password, user.password);
    if (match){
       const roles = Object.values(user.roles);
       // Create token
       const accessToken = jwt.sign(
           {
               "UserInfo" : {
                   "email" : user.email,
                   "roles" : roles
               }
           },
           secretKey,
           {expiresIn : '24h'}
       );
       res.status(200).json({
               accessToken,
               userId : user._id,
               roles
           })
   } else if (!match) {
        return res.status(403).json({
            message : 'Email or password are incorrect'
        })
    }
});

// middleware logout
module.exports.logout = async (req, res, next) => {
    try {

    }
    catch(error){
        return error => res.status(500).json({ error })
    }
}