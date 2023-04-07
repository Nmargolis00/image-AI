//Kumenger for image routes and
//we have to install a package to use open api (npm install openai)
//https://platform.openai.com/docs/api-reference/introduction
// installed nodemon
const router = require("express").Router();
require('dotenv').config();
const cloudinary = require('cloudinary').v2
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  organization:process.env.ORG_KEY,
  apiKey:process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);
const withAuth = require('../../utils/auth');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

//---------- at /api/images ----------

// router.post('/', async (req, res) => {

//   try {
//     const { name, prompt, photo } = req.body;
   
//     const photoUrl = await cloudinary.uploader.upload(photo);
  
//     const newPost = await Post.create({
//       name,
//       prompt,
//       photo: photoUrl.url,
//     });
//     res.status(200).json({ success: true, data: newPost });
//   } catch (err) {

//     res.status(500).json({ success: false, message: err });
//   }
// });

// at /api/images/getimages
router.post("/getimages", async (req, res) => {
  
  try {
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n:1,
      size: req.body.size,
      // response_format: 'b64_json',
    });
    const image = response.data.data[0].url
    console.log(image)
  
    
      res.status(200).json({ photo: image }); 
   
    
   
  } catch (error) {
    console.error(error)
    res.status(500).json(error);
  }
});

//get main page. WE WILL NEED TO HAVE A SEARCH FOR THE IMAGES ONCE THAT IS BUILT

router.get('/getimages', async (req, res) => {
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
      // res.redirect('login');
  }

});

//delete saved photos
router.delete('/getimage/:id', withAuth, async (req, res) => {
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
});

module.exports=router
