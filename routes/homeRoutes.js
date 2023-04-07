const router = require("express").Router();
const models = require('../models');
const withAuth = require('../utils/auth');


router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/home',(req,res)=>{
    res.render('homepage')
})

router.get('/show-image',(req,res)=>{
    res.render('show-image', {photo: req.session.photo})
})

//router.get('/signup', (req, res) => {
    //res.render('signup')
//})

module.exports=router