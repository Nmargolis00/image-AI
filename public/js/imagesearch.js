const imageSearch = async (event) => {
   event.preventDefault();
  
  const prompt = document.querySelector("#term").value.trim();

  const size = document.querySelector("#pic-size").value.trim();

  
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
    
  }
};

document.getElementById("searchImg").addEventListener("click", imageSearch);
