'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: "confirmado" }, 
        as: 'aulasMatriculadas'
      });
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      });
    } 
  }
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        functionValidate: function validate(dado){
          if(typeof dado == 'string' && dado.length < 3)
            throw new Error('O nome deve ser maior que 3 caracteres');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate:{//adicionando validação de email
        isEmail: {
          args: true,
          msg: 'Email inválido'
        }
      } 
    },
    role: DataTypes.STRING
  },{
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope:{
      where: { ativo: true }
    },
    scopes: {
      todos: { where: {}}
      //Aqui podemor definir diversas outras contraints (limitação)
    }
  });
  return Pessoas;
};