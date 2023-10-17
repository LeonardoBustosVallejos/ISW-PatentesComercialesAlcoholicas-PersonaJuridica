import express, { json } from 'express';
import { SALUDO } from './config/env.config.js';
import { setupDB } from './config/db.config.js';
import productRouter from './api/routes/product.route.js';

const app = express();
const port = 3000;

//Middleware para parsear el body a json
app.use(json());

//Middleware para las rutas
app.use('/api/product', productRouter);

//Hola mundo
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Api en la url http://localhost:${port}`);
  console.log(`La api saluda: ${process.env.SALUDO}`);
  setupDB();
});