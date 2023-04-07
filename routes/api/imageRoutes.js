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
    });
    console.log(response)
    const images = response.data.data
  res.render("images",{images})
  
    //res.status(200).json(response.data.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports=router
