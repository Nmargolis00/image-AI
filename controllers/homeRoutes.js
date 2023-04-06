const router = require("express").Router();
//api/getimages
router.get('/',(req,res)=>{
    res.render('homepage')
})


module.exports=router