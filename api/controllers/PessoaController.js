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

    static async GetAllMatriculas(req, res){
        const { idEstudante } = req.params;
        try {
            const matriculas = await database.Matriculas.findAll({
                where: {
                    estudante_id: idEstudante
                }
            });
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);    
        }
    }

    //Store Matriculas

    static async GetMatricula(req, res){
        const {idEstudante, idMatricula} = req.params;

        try {
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: idMatricula,
                    estudante_id: idEstudante
                },
                raw: true
            })

            if(matricula == null)
                throw new Error("Pessoa não encontrada")

            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(404).json({ mensagem: error.message  });
        }
    }

    static async CreateMatricula(req, res){ 
        try {
            const { idEstudante } = req.params;
            const matricula = {...req.body, estudante_id: Number(idEstudante)};
    
            const novaMatricula = await database.Matriculas.create(matricula);

            return res.status(201).json(novaMatricula);
            
        } catch (error) {
            return res.status(500).json({mensagem: error.message});
        }
    }

    static async UpdateMatricula(req, res){
        const {idEstudante, idMatricula} = req.params;
        const _matricula = req.body;
        
        try {
            await database.Matriculas.update(_matricula, {
                where: { id: Number(idMatricula), estudante_id: idEstudante }
            });

            const matricula = await database.Matriculas.findOne({
                where: {
                    id: idMatricula
                }
            });  

            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: idEstudante
                }
            });  

            if(matricula == null)
                throw new Error('matricula nao encontrada');
            if(pessoa == null)
                throw new Error('pessoa nao encontrada');

            return res.status(204).end();    
        } catch (error) {
            return res.status(404).json({ mensagem: error.message });
        }
    }

    static async DeleteMatricula(req, res){
        const {idMatricula, idEstudante} = req.params

        try {
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: idEstudante
                }
            });

            const matricula = await database.Matriculas.findOne({
                where: {
                    id: idMatricula
                }
            });

            const resultado = await database.Matriculas.destroy({
                where: { id: idMatricula, estudante_id: idEstudante }
            }); 

            if(pessoa == null)
                throw new Error('Pessoa nao encontrada');
            if(matricula == null)
                throw new Error('Matrícula nao encontrada');

            if(resultado == 0)
                throw new Error('Não foi possivel excluir a matricula ' + idMatricula);

            return res.status(204).end(); 
        } catch (error) { 
            return res.status(500).json({ mensagem : error.message }); 
        }
    }

}

module.exports = PessoaController;