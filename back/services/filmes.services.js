const Filme = require('./../models/filme')

class FilmeService {
    
    findAll= async() => await Filme.find();

    findById= async(id) => await Filme.findById(id);

    create= async (filme) => await Filme.create(filme);

    update = async (id, filmeAtualizado) => await Filme.updateOne({_id: id}, filmeAtualizado);

    delete= async (id) => await Filme.deleteOne({_id:id})
}

module.exports = FilmeService;