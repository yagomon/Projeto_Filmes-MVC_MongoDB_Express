const mongoose = require('mongoose');
const FilmesService = require('./../services/filmes.services');

const filmesService = new FilmesService();

class FilmesController {

    getFilmes = async (req, res) =>{
        const filmes = await filmesService.findAll();
        res.send(filmes)
    }

    getFilmesById = async (req, res) =>{
        const id = req.params.id;
        const filmeid= await filmesService.findById(id);
        res.send(filmeid)
    }

    createFilmes = async (req, res) =>{
        const filme = req.body;
        const filmeSalvo = await filmesService.create(filme)
        .then(()=> res.send({message: `Filme ${filmeSalvo.nome} adicionado com sucesso`}))
        .catch((err)=>{
            res.status(500).send({error: err});
        })

        
    }

    updateFilmes = async (req, res) =>{
        const id = req.params.id;
        const filmeEdite = req.body;
        const filmeSalvo = await filmesService.update(id, filmeEdite);
        res.send({message: `Filme atualizado`,})
    }

    deleteFilmes = async (req, res) =>{
        const id = req.params.id;
        await filmesService.delete(id);
        res.send({menssege: `Filme excluido`})
    }

}

module.exports= FilmesController