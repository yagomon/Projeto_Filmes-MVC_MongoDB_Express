const mongoose = require('mongoose');

const filmeModel = mongoose.Schema({
    nome: {type: String, required: true},
    imagem: {type: String, required: true},
    genero: {type: String, required: true},
    nota: {type: Number, required: true},
    status:{type: Boolean, default: false},
    dataCriacao: {type: Date, default: Date.now}
});

const Filme =  mongoose.model('filme', filmeModel);

module.exports= Filme;