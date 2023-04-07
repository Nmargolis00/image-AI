const router = require("express").Router();
const models = require('../models');
const withAuth = require('../utils/auth');


router.get('/',(req,res)=>{
    if(!req.session.logged_in){
    res.render('login',{logged_in:req.session.logged_in})
    }else{
    res.render('homepage',{logged_in:req.session.logged_in})
    }
})
router.get('/images',(req,res)=>{
    res.render('homepage',{logged_in:req.session.logged_in})
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