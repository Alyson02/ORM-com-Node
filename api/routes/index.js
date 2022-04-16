const PessoaController = require("../controllers/PessoaController")


module.exports = app => {
    app.get('/', async (req, res) =>{
        const pessoas = await PessoaController.GetAll(req, res)
        res.send({mensagem: pessoas}) 
    })
}