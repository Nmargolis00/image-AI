const spinner = document.getElementById("spinner");
const imageSearch = async () => {
  const prompt = document.querySelector("#term").value.trim();
const hideImage = document.getElementById("image")
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
    alert("size and text required");
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
      throw new Error("That image could not be generated");
    } else {
      const imageUrl = await response.json();
      
      document.querySelector("#image").src = await imageUrl.photo;
      document.querySelector("#image").style.display = "block";
      document.getElementById("spinner").style.display = "none";
    }
   
  } catch (error) {
    console.log(console.log(error));
  }
  
}
window.addEventListener("load", () => {
  document.getElementById("spinner").style.display = "none";
});
document.getElementById("searchImg").addEventListener("click", imageSearch);
