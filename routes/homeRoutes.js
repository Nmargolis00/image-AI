const router = require("express").Router();
const models = require('../models');
const withAuth = require('../utils/auth');


router.get('/',(req,res)=>{
    res.render('login')
})
router.get('/images',(req,res)=>{
    res.render('homepage')
})

router.get('/home',(req,res)=>{
    res.render('homepage')
})

//router.get('/signup', (req, res) => {
    //res.render('signup')
//})

module.exports=router