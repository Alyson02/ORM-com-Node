const database = require('../models');

class TurmaController{

    static async GetAll(req, res){
        try {
            const turmas = await database.Turmas.findAll();
            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(500).json(error.message);    
        }
    }

    static async Get(req, res){
        const { idTurma } = req.params;

        try {
            const turma = await database.Turmas.findOne({
                where: {
                    id: idTurma
                }
            })

            if(turma == null)
                throw new Error("Turma não encontrada")

            return res.status(200).json(turma);
        } catch (error) {
            return res.status(404).json({ mensagem: error.message  });
        }
    }

    static async Create(req, res){
        const _turma = req.body; 

        try {
            const turma = await database.Turmas.create(_turma);
            res.status(201).json(turma);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }

    static async Update(req, res){
        const {idTurma} = req.params;
        const _turma = req.body;
        
        try {
            await database.Turmas.update(_turma, {
                where: { id: idTurma }
            });

            const turma = await database.Turmas.findOne({
                where: {
                    id: idTurma
                }
            });  

            if(turma == null)
                throw new Error('Turma nao encontrada');
            
            return res.status(204).end();    
        } catch (error) {
            return res.status(404).json({ mensagem: error.message });
        }
    }

    static async Delete(req, res){
        const {idTurma} = req.params

        try {
            const turma = await database.Turmas.findOne({
                where: {
                    id: idTurma
                }
            });

            const resultado = await database.Turmas.destroy({
                where: { id: idTurma }
            }); 

            if(turma == null)
                throw new Error('Turma nao encontrada');

            console.log(resultado);

            if(resultado == 0)
                throw new Error('Não foi possivel excluir a turma ' + idTurma);

            return res.status(204).end(); 
        } catch (error) { 
            return res.status(500).json({ mensagem : error.message }); 
        }
    }

}

module.exports = TurmaController;