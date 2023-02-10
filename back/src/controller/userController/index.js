import userSchema from '../../db/models/userModel.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const {hashSync, compareSync} = bcryptjs;
const {sign, decode, verify} =jsonwebtoken;

import * as dotenv from 'dotenv'
dotenv.config();

export async function loggin(req, res){
    if(!req.body.hasOwnProperty('userName') || !req.body.hasOwnProperty('userPassword')) return res.status(401).send("Faltan Campos")

    const {userName} = req.body
    const user = await userSchema.find({name:userName})

    if(user.length == 0) return res.status(401).send("El usuario no existe")

    var pwdUser = user[0].password
    if(!compareSync(req.body.userPassword, pwdUser)) return res.status(401).send("Contraseña erronea")

    const token = (sign({_id: user[0]._id}, process.env.ACCEPT_TOKEN_SECRET ,{expiresIn:"8h"}))
    return res.status(200).json({token})
}

export async function verifyToken(req, res, next) {
    if(!req.headers.authorization) return res.status(401).send("No autorizado")

    const token = req.headers.authorization.split(' ')[1]
    if(token===null) return res.status(401).send("No autorizado")

    const { exp } = decode(token)
    if(Date.now() >= exp * 1000) return res.status(401).send("Expirado el Token")

    const payload = await verify(token, process.env.ACCEPT_TOKEN_SECRET)
    req.user = payload._id
    next()
}

// export async function insertUser(req, res){

//     const newUser = {
//         name: "user_admin",
//         password: hashSync("dCg3E6#%!SE", 10)
//     }

//     const user =  new userSchema(newUser)

//     //console.log(store)

//     await user.save()
//     return res.json(user)

// }