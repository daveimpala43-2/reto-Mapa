import Express from 'express';
import cors  from'cors';
import Path from 'path';

import Routers from './route.js'
import startConc from './db/index.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname)

const app = Express();

app.set('port', process.env.PORT || 4000);


app.use(cors());
app.use(Express.json());
// app.use(Express.static(Path.resolve(__dirname,'public')));

app.use("/api", Routers)

// app.get('*', function (req, res, next){
//     res.sendFile(Path.join(__dirname, 'public/index.html'));
// })

startConc();

app.listen(app.get('port'),()=>{
	console.log("server on")
})