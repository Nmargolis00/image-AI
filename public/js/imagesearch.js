<<<<<<< HEAD
const imageSearch = () => {
=======
const imageSearch = async (event) => {
   event.preventDefault();
  
>>>>>>> d2904c47f7fa19a40f602b392c1db1b5d99ff25c
  const prompt = document.querySelector("#term").value.trim();

  const size = document.querySelector("#pic-size").value.trim();

<<<<<<< HEAD
  if (!prompt || !size) {
    alert("size and text required");
    return;
=======
  
  if (prompt  && size) {
 
    try {
        const response = await fetch("api/image/getimages", {
            method: "POST",
            body: JSON.stringify({prompt,size}),
            headers: { "Content-Type": "application/json" },
          });
     
          if (response.ok) {
           
          
           const data = await response.json()
       
           localStorage.setItem("img", data.photo)
          
        window.location.replace("show-image", data)
         
          }
    } catch (error) {
       console.log(error)
    }
    
>>>>>>> d2904c47f7fa19a40f602b392c1db1b5d99ff25c
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

document.getElementById("searchImg").addEventListener("click", imageSearch);
