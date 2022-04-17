const  router = require('express').Router();
const TurmaController = require('../controllers/TurmaController');

router.get('/turmas', TurmaController.GetAll);

router.get('/turmas/:idTurma', TurmaController.Get);

router.post('/turmas', TurmaController.Create);

router.put('/turmas/:idTurma', TurmaController.Update);

router.delete('/turmas/:idTurma', TurmaController.Delete)

module.exports = router;