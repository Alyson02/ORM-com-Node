const  router = require('express').Router();
const PessoaController = require('../controllers/PessoaController');

router.get('/pessoas', PessoaController.GetAll)

module.exports = router;