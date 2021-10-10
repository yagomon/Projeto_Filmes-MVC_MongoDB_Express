const express = require('express');
const FilmesController = require('./../controllers/filmes.controllers');

const router = express.Router();
const filmesController = new FilmesController();


router.get('/',filmesController.getFilmes);

router.get('/:id', filmesController.getFilmesById)

router.post('/add', filmesController.createFilmes);

router.put('/:id', filmesController.updateFilmes);

router.delete('/:id', filmesController.deleteFilmes);


module.exports= router;