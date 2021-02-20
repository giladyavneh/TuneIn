const axios = require("axios")
const {
    User
} = require("../models")
const jwt = require("jsonwebtoken")
const express = require("express")
const route = express.Router()

route.get("/google", async (req,response,next)=>{
    try {
        const auth_token = req.headers.authorization
        const {data} = await axios.get(
            'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
            { headers: { authorization: auth_token } }
        )
        const {username, password, email} = data;
        let res = await User.findOne({where: {email}})
        if (!res) res = await User.create({username, password, email})
        response.send({
            access_token:jwt.sign({
            id:res.id,
            username:res.username,
            email:res.email,
            is_admin:res.is_admin
        }, process.env.JWT_ACCESS_SECRET,{expiresIn:20*60}),
        refresh_token:jwt.sign({
            id:res.id,
            username:res.username,
            email:res.email,
            is_admin:res.is_admin
        }, process.env.JWT_REFRESH_SECRET)
        });
        
    } catch(e) {
        next(e)
    }
})

module.exports = route;