const database = require('../models');

class PessoaController{
    static async GetAll(req, res){
        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).json(error.message);    
        }
    }
}

module.exports = PessoaController;