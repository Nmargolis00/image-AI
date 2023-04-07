const imageSearch = () => {
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
  const imageUrl=await response.json()
  console.log('-----53----')
  console.log(imageUrl)
  console.log('-----55----')
  console.log(imageUrl.data)

  
 

   

    document.querySelector("#image").src = imageUrl;
  } catch (error) {
    console.log(console.log(error));
  }
}

document.getElementById("serchImg").addEventListener("click", imageSearch);
