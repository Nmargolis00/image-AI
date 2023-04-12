const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");
//At /api/users

//Get users
router.get("/", async (req, res) => {
  const userData = await User.findAll();
  res.status(200).json(userData);
});

//post user info for sign up
router.post("/signup", async (req, res) => {

  try {
    const userData = await User.create({
      email: req.body.email, 
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.user_name;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Post route for login
router.post("/login", async (req, res) => {
  try {
    const userLogin = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // if(!userLogin){
    //   return res.status(400).json({message: 'No user found, please create an account'});

    // }

    const check = userLogin.checkPassword(req.body.password);

    if (!check) {
      alert(
        "Incorrect password, please try again. If you do not have an account, please create one"
      );
      res
        .status(400)
        .json({
          message:
            "Incorrect password, please try again. If you do not have an account, please create one",
        });
      return;
    } else {
      req.session.save(() => {
        req.session.user_id = userLogin.id;
        req.session.email = userLogin.email;
        req.session.logged_in = true;
        console.log(req.session);
        res.json({ user: userLogin, message: "Welcome in!" });
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//Log Out

router.post("/logout", (req, res) => {
 
  if (req.session.logged_in) {
    req.session.destroy(() => {
    
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//get main login page
router.get("/login", async (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

module.exports = router;
