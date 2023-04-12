// var imgSrc = document.getElementById("#image").src;
var saveEl = document.getElementById("savebtn");
const saveImage = async () => {
  try {
    const response = await fetch("/api/image/saveimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
        errDisplay.innerHTML="Error trying to save image. Please try again."
      errDisplay.style.visibility='visibile'
   
        
        setInterval(()=>{
          errDisplay.style.visibility='hidden'
         },3000)
      } else {
        errDisplay.innerHTML="Image saved to Dashboard."
        errDisplay.style.visibility='visibile'
     
          
          setInterval(()=>{
            errDisplay.style.visibility='hidden'
           },3000)
       ;
      }
  } catch (error) {
    console.log(error);
  }
  document.location.replace("/dashboard")
};

saveEl.addEventListener("click", saveImage);
