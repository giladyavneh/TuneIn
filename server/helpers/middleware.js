const { mailCheck, passwordCheck, usernameCheck } = require("./auth");

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

module.exports = { signinAuth, loginAuth }