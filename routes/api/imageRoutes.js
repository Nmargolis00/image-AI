const { Image } = require("../../models");
const router = require("express").Router();
const { Community } = require("../../models");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.ORG_KEY,
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);
const withAuth = require("../../utils/auth");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/getimages",withAuth, async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: req.body.size,
    });

    const image = response.data.data[0].url;
    req.session.save(() => {
      req.session.current_image = image;
      res.status(200).json({ photo: image });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
;
//save image to db
router.post("/saveimage",withAuth, async (req, res) => {
  try {
    const saveImage = await Image.create({
      image_url: req.session.current_image,
      user_id: req.session.user_id,
    });
    res.status(200).json(saveImage);
  } catch (error) {
    console.log(error);
  }
});
router.post("/community", async (req, res) => {
  try {
    const photoUrl = await cloudinary.uploader.upload(req.body.image_src);

    const response = await Community.create({
      picture: photoUrl.url,
    });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get main page. WE WILL NEED TO HAVE A SEARCH FOR THE IMAGES ONCE THAT IS BUILT

//delete saved photos
router.delete("/delete",withAuth, async (req, res) => {
  try {
    const delImages = await Image.destroy({
      where: {
        id: req.body.imgid,
       
      },
    });
    if (!delImages) {
      res.status(400).json({ message: "No image found" });
      return;
    }
    res.status(200).json(delImages);
  } catch (error) {
    res.status(400).json(error);
    res.redirect("login");
  }
});

module.exports = router;
