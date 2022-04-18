const  router = require('express').Router();
const PessoaController = require('../controllers/PessoaController');

router.get('/pessoas', PessoaController.GetAll);

router.get('/pessoas/:idPessoa', PessoaController.Get);

router.post('/pessoas', PessoaController.Create);

router.put('/pessoas/:idPessoa', PessoaController.Update);

router.delete('/pessoas/:idPessoa', PessoaController.Delete);

router.post('/pessoas/:id/recuperar', PessoaController.RestorePessoa)

// store matriculas

router.get('/pessoas/:idEstudante/matriculas', PessoaController.GetAllMatriculas);

router.get('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.GetMatricula);

router.post('/pessoas/:idEstudante/matriculas', PessoaController.CreateMatricula);

router.put('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.UpdateMatricula);

router.delete('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.DeleteMatricula);

module.exports = router;