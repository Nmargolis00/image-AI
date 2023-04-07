const router = require('express').Router();
const userRoutes = require('./userRoutes');
const imageRoutes=require('./imageRoutes')
router.use('/users', userRoutes);
router.use('/image',imageRoutes)


module.exports = router;