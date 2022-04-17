const  router = require('express').Router();
const NivelController = require('../controllers/NivelController');

router.get('/niveis', NivelController.GetAll);

router.get('/niveis/:idNivel', NivelController.Get);

router.post('/niveis', NivelController.Create);

router.put('/niveis/:idNivel', NivelController.Update);

router.delete('/niveis/:idNivel', NivelController.Delete)

module.exports = router;