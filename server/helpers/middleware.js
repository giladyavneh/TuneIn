const { mailCheck, passwordCheck, usernameCheck } = require("./auth");
const {
    User
} = require("../models")
const bcrypt = require("bcrypt");

function signinAuth(req, res, next){
    const {username, password, email} = req.body;
    if(!passwordCheck(password) || !usernameCheck(username) || !mailCheck(email))
    return res.status(400).send("malformed content")
    next()
}

function loginAuth(req, res, next){
    const {username, password} = req.body;
    if(!passwordCheck(password) || !usernameCheck(username))
    return res.status(400).send("malformed content")
    next()
}

async function adminAuth(req, res, next){
    const {idKey, username} = JSON.parse(req.headers['admin-auth'])
    const user = await User.findOne({where:{username}})
    if (!user) return res.status(400).send('unauthorised request')
    if (!bcrypt.compareSync(user.password, idKey)||!user.is_admin) return res.status(400).send('unauthorised request')
    next()
}

module.exports = { signinAuth, loginAuth, adminAuth }