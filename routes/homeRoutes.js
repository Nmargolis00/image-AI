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
  console.log(req.session)
  const getPhotos = await Community.findAll();
  if (getPhotos) {

  
  const mapPhotos = getPhotos.map((one) => one.get({ plain: true }));
  const orderPhotos = mapPhotos.reverse()
  
  res.render("community", {pic: orderPhotos});
}
else {
  res.render("community")
}
});
router.get("/login", (req, res) => {
  res.render("login",{current_image:req.session.current_image});
});



router.get("/home", (req, res) => {
  res.render("homepage",{logged_in: req.session.logged_in ,current_image:req.session.current_image});
});

router.get("/show-image", (req, res) => {
  res.render("show-image", { photo: req.session.photo });
});

router.get('/signup',(req,res)=>{
  res.render('signUp')
})
//router.get('/signup', (req, res) => {
//res.render('signup')
//})

module.exports = router;
