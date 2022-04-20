const  router = require('express').Router();
const PessoaController = require('../controllers/PessoaController');

router.get('/pessoas', PessoaController.GetAll);

router.get('/pessoas/allAtivos', PessoaController.GetAllAtivos);

router.get('/pessoas')

router.get('/pessoas/:idPessoa', PessoaController.Get);

router.post('/pessoas', PessoaController.Create);

router.put('/pessoas/:idPessoa', PessoaController.Update);

router.delete('/pessoas/:idPessoa', PessoaController.Delete);

router.post('/pessoas/:id/recuperar', PessoaController.RestorePessoa)

router.post('/pessoas/:idPessoa/cancelar', PessoaController.CancelaPessoa)

// store matriculas

router.get('/pessoas/:idEstudante/matriculas', PessoaController.GetAllMatriculas);

router.get('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.GetMatricula);

router.get('/pessoas/:idEstudante/matriculasAtivadas/', PessoaController.GetAllMatriculasAtivadas);

router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.GetMatriculaByTurma);

router.get('/pessoas/matricula/lotada', PessoaController.GetTurmasLotadas)

router.post('/pessoas/:idEstudante/matriculas', PessoaController.CreateMatricula);

router.put('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.UpdateMatricula);

router.delete('/pessoas/:idEstudante/matriculas/:idMatricula', PessoaController.DeleteMatricula);

module.exports = router;