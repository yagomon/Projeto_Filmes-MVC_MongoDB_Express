const express = require('express');
const cors = require('cors');
const Conn = require('./conn/conn');
const filmesRoutes = require('./routes/filmes.routes');

const app = express();
app.use(cors());
app.use(express.json());
Conn();

app.use('/filmes', filmesRoutes);


const port = 3000;
app.listen(port, ()=> {
console.info(`O app está rodando na porta http://localhost:${port}/`)
})