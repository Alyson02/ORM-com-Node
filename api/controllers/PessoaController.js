const database = require('../models');
const Sequelize = require('sequelize');

class PessoaController{

    static async GetAllAtivos(req, res){
        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).json(error.message);    
        }
    }

    static async GetAll(req, res){
        try {
            const pessoas = await database.Pessoas.scope('todos').findAll();
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

    static async CancelaPessoa(req, res){
        const {idPessoa} = req.params;

        try {
            database.sequelize.transaction(async transaction => {
                await database.Pessoas.update(
                {
                    ativo: false
                }, 
                {
                    where: { id: idPessoa }
                },
                {
                    transaction: transaction
                }
                );
    
                await database.Matriculas.update(
                {
                    status: 'Cancelado'
                }, 
                {   
                    where: { estudante_id: idPessoa}
                },
                {
                    transaction: transaction
                })
                
                return res.status(204).end();    
            })
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

    
    //Store Matriculas

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

    static async GetMatriculaByTurma(req, res){
        const {turmaId} = req.params;

        try {
            const matriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id'], 'DESC']
            })

            if(matriculas == null)
                throw new Error("Pessoa não encontrada")

            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(404).json({ mensagem: error.message  });
        }
    }

    static async GetTurmasLotadas(req, res){
        const lotacaoTurma = 2;

        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })

            if(turmasLotadas == null)
                throw new Error("Pessoa não encontrada")

            return res.status(200).json(turmasLotadas);
        } catch (error) {
            return res.status(404).json({ mensagem: error.message  });
        }
    }

    static async GetAllMatriculasAtivadas(req, res){
        const {idEstudante} = req.params;

        console.log("O id da pessoa é " + idEstudante);

        try {
            const pessoa = await database.Pessoas.findOne({
                where: {
                    id: idEstudante
                },
            });

            const matricula = await pessoa.getAulasMatriculadas();

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

    static async RestorePessoa(req, res) {  
        const { id } = req.params
        try {
            await database.Pessoas.restore({
              where: { id: Number(id) }
            })
            return res.status(204).end();
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }

}

module.exports = PessoaController;