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

async function jwtAuth(req, res) {
    let payload;
    if (req.headers.refresh) {
      try {
        payload = await jwt.verify(
          req.headers.refresh,
          process.env.JWT_REFRESH_SECRET
        );
      } catch (e) {
        console.log(e.message === "jwt expired")
        throw e;
      }
      const accessToken = jwt.sign({
          id: payload.id,
          email: payload.email,
          admin: payload.admin,
          workPlaces: payload.workPlaces,
        }, process.env.JWT_ACCESS_SECRET, { expiresIn: 15 * 60 });
      res.set("accessToken", accessToken);
    } else {
      try {
        payload = await jwt.verify(
          req.headers.auth,
          process.env.JWT_ACCESS_SECRET
        );
      } catch (e) {
        console.log(e);
        throw new Error("access expired");
      }
    }
    return payload;
  }

async function userAuthentication(req, res, next) {
try {
    payload = await jwtAuth(req, res);
} catch (e) {
    console.log(e)
    return e.message == "access expired"
    ? res.status(235).send("")
    : e.message == "jwt expired"
    ? res.status(240).send("")
    : res.status(401).send("Not Autherized");
}
req.auth = { id: payload.id };
next();
}

async function buisnessAdminAuth(req, res, next) {
let payload;
try {
    payload = await jwtAuth(req, res);
} catch (e) {
    return e.message == "access expired"
    ? res.status(235).send("")
    : e.message == "jwt expired"
    ? res.status(240).send("")
    : res.status(401).send("");
}
req.auth = { id: payload.id, admin: payload.admin };
const { buisnessid } = req.headers;
req.headers.buisnessId = buisnessid;
if (!req.auth.admin.includes(parseInt(buisnessid))) {
    console.log("Buisness Auth failded");
    return res.status(403).send("This isn't your buisness");
}
next();
}
module.exports = { signinAuth, loginAuth, adminAuth }