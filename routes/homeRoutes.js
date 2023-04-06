const router = require("express").Router();
const models = require('../models');
const withAuth = require('../utils/auth');


router.get('/',(req,res)=>{
    res.render('login')
})
router.get('/images',(req,res)=>{
    res.render('homepage')
})


module.exports=router