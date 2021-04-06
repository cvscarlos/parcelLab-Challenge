import cors from 'cors';
import express from 'express';

import Data from './data.mjs';

// App defaults
const port = process.env.PORT || 3000;
const jsonBase = {data: null, errors: [], meta: {}};

// Instanciating the Express App
const app = express();
app.use(cors());

// Home, hello world
app.get('/', (req, res) => {
    res.json(['Hello World!']);
});

// Data parser
const data = new Data();

// Orders by email
app.get('/orders/:email', (req, res) => {
    const output = Object.assign({}, jsonBase);
    output.data = data.getOrdersByEmail(req.params.email);
    res.json(output);
});

// Order by id
app.get('/order/:id', (req, res) => {
    const output = Object.assign({}, jsonBase);
    output.data = data.getOrderById(req.params.id);
    res.json(output);
});

// serving the app
app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});

export default app;
