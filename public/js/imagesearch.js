const spinner=document.getElementById('spinner')
const imageSearch = async () => {
  const prompt = document.querySelector("#term").value.trim();

  const size = document.querySelector("#pic-size").value.trim();

  if (!prompt || !size) {
    alert("size and text required");
    return;
  }
  generateImageRequest(prompt, size);
};
// if (prompt && size) {
//   console.log({ prompt, size });
//   try {
//     const response = await fetch("/api/image/getimages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt,
//         size,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("NO IMAGE");
//     } else {
//       const data = await response.json();
//       console.log(data);
//       //window.location.replace("/api/getimages");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
//};
async function generateImageRequest(prompt, size) {
 let parsedData=JSON.stringify({prompt,size})
  try {
    document.getElementById('spinner').style.display='block'
    const response = await fetch("/api/image/getimages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:parsedData
    });

    if (!response.ok) {
      throw new Error("That image could not be generated");
    }
    else{
        const imageUrl=await response.json()
       document.querySelector("#image").src = imageUrl.photo;
       document.getElementById('spinner').style.display='none'
    }
  
 

  
 

   

   
  } catch (error) {
    console.log(console.log(error));
  }
}
window.addEventListener('load',()=>{document.getElementById('spinner').style.display="none"})
document.getElementById("searchImg").addEventListener("click", imageSearch);
