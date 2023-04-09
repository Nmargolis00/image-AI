const router = require("express").Router();
const { Community } = require("../models");

const withAuth = require("../utils/auth");

// router.get('/',(req,res)=>{
//     if(!req.session.logged_in){
//     res.render('login',{logged_in:req.session.logged_in})
//     }else{
//     res.render('homepage',{logged_in:req.session.logged_in})
//     }
// })
router.get("/", async (req, res) => {
  const getPhotos = await Community.findAll();
  
  const mapPhotos = getPhotos.map((one) => one.get({ plain: true }));
  
  res.render("community", {pic: mapPhotos});
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/images", (req, res) => {
  res.render("homepage", { logged_in: req.session.logged_in });
});

router.get("/home", (req, res) => {
  res.render("homepage");
});

router.get("/show-image", (req, res) => {
  res.render("show-image", { photo: req.session.photo });
});

//router.get('/signup', (req, res) => {
//res.render('signup')
//})

module.exports = router;
