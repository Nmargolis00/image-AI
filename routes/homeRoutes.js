const router = require("express").Router();
//api/getimages
router.get('/',(req,res)=>{
    res.render('login')
})


module.exports=router