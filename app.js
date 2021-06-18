import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

//import indexRouter from './routes/index.js';
import {router as indexRouter} from './routes/index.js';
import {router as usersRouter} from './routes/users.js';
import {router as recetasRouter} from './routes/recetas.js';
import {router as ingredientesRouter} from './routes/ingredientes.js';
import {router as pedidosRouter} from './routes/pedidos.js';
import {router as busquedaRouter} from './routes/barraBusquedas.js';



import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recetas', recetasRouter);
app.use('/ingredientes', ingredientesRouter);
app.use('/pedidos', pedidosRouter);
app.use('/barraBusquedas', busquedaRouter);
export {app};
