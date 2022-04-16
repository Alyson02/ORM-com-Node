const  router = require('express').Router();
const PessoaController = require('../controllers/PessoaController');

router.get('/pessoas', PessoaController.GetAll);

router.get('/pessoas/:idPessoa', PessoaController.Get);

router.post('/pessoas', PessoaController.Create);

router.put('/pessoas/:idPessoa', PessoaController.Update);

router.delete('/pessoas/:idPessoa', PessoaController.Delete)

module.exports = router;