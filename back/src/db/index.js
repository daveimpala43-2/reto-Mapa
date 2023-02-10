import {connect, set} from 'mongoose'

import * as dotenv from 'dotenv'
dotenv.config();

const mongoURL = `${process.env.DB_URL}/${process.env.DB_NAME}`

export default async function startConc(){
    set("strictQuery", false);
    await connect(mongoURL,{
        useNewUrlParser: true,
        auth: {
          authSource: process.env.DB_NAME
        },
        user: process.env.DB_USER,
        pass: process.env.DB_PWD,
    }).then(db=>console.log("Mongodb on"))
    .catch(err=>console.log("Mongodb Error: "+err))
}
