const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./dog');
const dogsRouter = require('./dogs');
const temperamentRouter = require('./temperament');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dog', dogRouter);
router.use('/dogs', dogsRouter);
router.use('/temperament', temperamentRouter);

module.exports = router;

