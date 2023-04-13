const spinner = document.getElementById("spinner");
const errDisplay=document.getElementById('errDisplay')
const imageSearch = async () => {
  const prompt = document.querySelector("#term").value.trim();

  const size = document.querySelector("#pic-size").value.trim();
  const dynamic = document.querySelector("#dynamic-box");

   if (size == "1024x1024") {
        dynamic.setAttribute("style", "margin-left: 5%;");
        document.querySelector("#image").style.display = "none";
        
      }
      else if (size == "512x512") {
          dynamic.setAttribute("style", "margin-left: 13%;");
          document.querySelector("#image").style.display = "none";
      }
      else {
        dynamic.setAttribute("style", "margin-left: 22%;");
        document.querySelector("#image").style.display = "none";
      }

  if (!prompt || !size) {
    //alert("size and text required");
   errDisplay.innerHTML="text and size required"
   setInterval(()=>{
    errDisplay.style.visibility='hidden'
   },3000)
    return;
  }
  generateImageRequest(prompt, size);
};

async function generateImageRequest(prompt, size) {
  let parsedData = JSON.stringify({ prompt, size });
  try {
    document.getElementById("spinner").style.display = "block";
    const response = await fetch("/api/image/getimages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: parsedData,
    });

    if (!response.ok) {
      // errDisplay.innerHTML="Image not found. Please try another search term."
    errDisplay.style.visibility='visibile'
    document.getElementById("spinner").style.display = "none";
      
      // setInterval(()=>{
      //   errDisplay.style.visibility='hidden'
      //  },3000)
    } else {
      
      const imageUrl = await response.json();
      
      document.querySelector("#image").src = await imageUrl.photo;
      document.querySelector("#image").style.display = "block";
      document.getElementById("spinner").style.display = "none";
      rerender(imageUrl.photo)
    }
   
  } catch (error) {
    console.log(error);
  }
  
}
const rerender=(url)=>{
  window.addEventListener("load", () => {
    document.querySelector("#image").src = url;
  });
}
window.addEventListener("load", () => {
  document.getElementById("spinner").style.display = "none";
});
document.getElementById("searchImg").addEventListener("click", imageSearch);
