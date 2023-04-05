//Kumenger for image routes and
//we have to install a package to use open api (npm install openai)
//https://platform.openai.com/docs/api-reference/introduction
// installed nodemon
const router = require("express").Router();
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  organization:process.env.ORG_KEY,
  apiKey:process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);


router.post("/getimages", async (req, res) => {
  
  try {
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n:5,
      size: req.body.size,
    });
    //const images=response.data.data
  // res.render("images",{images})
  
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports=router
