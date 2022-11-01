const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const products = require('./products');
const users = require('./users');
const post = require('./post');
const comments = require('./comments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/products', products);
router.use('/users', users);
router.use('/post', post);
router.use('/comments', comments);



module.exports = router;
