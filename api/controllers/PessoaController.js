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

    static async Get(req, res){
        const { idPessoa } = req.params;

        try {
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: idPessoa
                }
            })

            if(pessoa == null)
                throw new Error("Pessoa não encontrada")

            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(404).json({ mensagem: error.message  });
        }
    }

    static async Create(req, res){
        const _pessoa = req.body; 

        try {
            const pessoa = await database.Pessoas.create(_pessoa);
            res.status(201).json(pessoa);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }

    static async Update(req, res){
        const {idPessoa} = req.params;
        const _pessoa = req.body;
        
        try {
            await database.Pessoas.update(_pessoa, {
                where: { id: idPessoa }
            });

            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: idPessoa
                }
            });  

            if(pessoa == null)
                throw new Error('Pessoa nao encontrada');
            
            return res.status(204).end();    
        } catch (error) {
            return res.status(404).json({ mensagem: error.message });
        }
    }

    static async Delete(req, res){
        const {idPessoa} = req.params

        try {
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: idPessoa
                }
            });

            const resultado = await database.Pessoas.destroy({
                where: { id: idPessoa }
            }); 

            if(pessoa == null)
                throw new Error('Pessoa nao encontrada');

            console.log(resultado);

            if(resultado == 0)
                throw new Error('Não foi possivel excluir a pessoa ' + idPessoa);

            return res.status(204).end(); 
        } catch (error) { 
            return res.status(500).json({ mensagem : error.message }); 
        }
    }

}

module.exports = PessoaController;