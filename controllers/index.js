const router = require('express').Router();
const imageRoute=require('./api/imageRoutes')
const userRoute=require('./api/userRoutes')
const homeRoutes=require('./homeRoutes')

router.use('/api',imageRoute)
router.use('/',homeRoutes)
router.use('/api',userRoute)

module.exports=router