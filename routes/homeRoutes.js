const router = require("express").Router();
const { Community } = require("../models");
const { Image } = require("../models/index");
const withAuth = require("../utils/auth");


router.get("/", async (req, res) => {
 
  const getPhotos = await Community.findAll();
  if (getPhotos) {

  
  const mapPhotos = getPhotos.map((one) => one.get({ plain: true }));
  const orderPhotos = mapPhotos.reverse()
  console.log(orderPhotos)
  res.render("community", {pic: orderPhotos, logged_in: req.session.logged_in});
}
else {
  res.render("community")
}
});
router.get("/login", (req, res) => {
  res.render("login", {logged_in: req.session.logged_in});
});



router.get("/signup", (req, res) => {
  res.render("signup", { logged_in: req.session.logged_in });
});

router.get("/home", (req, res) => {
  res.render("homepage", { logged_in: req.session.logged_in });
});

router.get("/show-image", (req, res) => {
  res.render("show-image", { photo: req.session.photo, logged_in: req.session.logged_in });
});

router.get("/dasboard",withAuth, async(req, res) => {
  try {
    const response = await Image.findAll({
      where: { user_id: req.session.user_id },
    });
    const plainData = response.map((img) => img.get({ plain: true }));
  
    res.render("dashboard",  {
      plainData, logged_in: req.session.logged_in
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/signup',(req,res)=>{
  res.render('signUp')
})
//router.get('/signup', (req, res) => {
//res.render('signup')
//})

module.exports = router;
