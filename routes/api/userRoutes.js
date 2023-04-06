const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
//At /api/users


//Get users
router.get('/', async (req, res) => {
    const userData = await User.findAll()
    res.status(200).json(userData);
})


//post user info for sign up
router.post('/', async (req, res) => {
    try {
       const userData = await User.create(req.body);

       req.session.save(() => {
    req.session.user_id = userData.id;
       req.session.user_name = userData.user_name;
       req.session.email = userData.email;
       req.session.logged_in = true;
       
       res.status(200).json(userData);
    })
    } catch (err) {
      res.status(400).json(err); 
    }
});


//Post route for login
router.post('/login', async (req, res) => {
    try {
        const userLogin = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if(!userLogin){
            res.status(400).json({message: 'No user found, please create an account'});
            return;
        }
        const checkPassword = userLogin.checkPassword(req.body.password)
        if(!checkPassword){
            res.status(400).json({message: 'Incorrect password, please try again. If you do not have an account please create one'});
            return;
        } 
        req.session.save(() => {
            req.session.user_id = userLogin.id
            req.session.email = userLogin.email;
            req.session.logged_in = true;
            res.json({user: userLogin, message: 'Welcome in!'})
        })
    } catch (error) {
        res.status(400).json(error);
    }
});

//Log Out

router.post('/logout', async (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
});

//get main login page
router.get('/login', async (req, res) =>{
    res.render('main', {loggedIn: req.session.loggedIn})
});

//get main page. WE WILL NEED TO HAVE A SEARCH FOR THE IMAGES ONCE THAT IS BUILT

router.get('/images', withAuth, async (req, res) => {
    try {
        const userImages = await Image.findAll({
            where: {
                user_id: req.session.user_id
            },
        })
        const storedImages = userImages.map((image) => {
            image.get({plain: true})
            res.render('/images', storedImages)
    })
    } catch (error) {
        res.status(400).json(error);
        res.redirect('login');
    }
  
})

//delete saved photos
router.delete('/image/:id', withAuth, async (req, res) => {
    try {
        const delImages = await Image.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!delImages) {
            res.status(400).json({message: 'No image found'});
            return;
        }
        res.status(200).json(delImages);
    } catch (error) {
        res.status(400).json(error);
        res.redirect('login');
    }
})


module.exports=router