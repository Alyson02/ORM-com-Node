const database = require('../models');

class NivelController{

    static async GetAll(req, res){
        try {
            const niveis = await database.Niveis.findAll();
            return res.status(200).json(niveis);
        } catch (error) {
            return res.status(500).json(error.message);    
        }
    }

    static async Get(req, res){
        const { idNivel } = req.params;

        try {
            const nivel = await database.Niveis.findOne({
                where: {
                    id: idNivel
                }
            })

            if(nivel == null)
                throw new Error("Nivel não encontrada")

            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(404).json({ mensagem: error.message  });
        }
    }

    static async Create(req, res){
        const _nivel = req.body; 

        try {
            const nivel = await database.Niveis.create(_nivel);
            res.status(201).json(nivel);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }

    static async Update(req, res){
        const {idNivel} = req.params;
        const _nivel = req.body;
        
        try {
            await database.Niveis.update(_nivel, {
                where: { id: idNivel }
            });

            const nivel = await database.Niveis.findOne({
                where: {
                    id: idNivel
                }
            });  

            if(nivel == null)
                throw new Error('Pessoa nao encontrada');
            
            return res.status(204).end();    
        } catch (error) {
            return res.status(404).json({ mensagem: error.message });
        }
    }

    static async Delete(req, res){
        const {idNivel} = req.params

        try {
            const nivel = await database.Niveis.findOne({
                where: {
                    id: idNivel
                }
            });

            const resultado = await database.Niveis.destroy({
                where: { id: idNivel }
            }); 

            if(nivel == null)
                throw new Error('Pessoa nao encontrada');

            console.log(resultado);

            if(resultado == 0)
                throw new Error('Não foi possivel excluir o nível ' + idPessoa);

            return res.status(204).end(); 
        } catch (error) { 
            return res.status(500).json({ mensagem : error.message }); 
        }
    }

}

module.exports = NivelController;