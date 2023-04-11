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
        errDisplay.innerHTML="error trying to save image please try agin"
      errDisplay.style.visibility='visibile'
   
        
        setInterval(()=>{
          errDisplay.style.visibility='hidden'
         },3000)
      } else {
        errDisplay.innerHTML="Image Saved to Database"
        errDisplay.style.visibility='visibile'
     
          
          setInterval(()=>{
            errDisplay.style.visibility='hidden'
           },3000)
       ;
      }
  } catch (error) {
    console.log(error);
  }

};

saveEl.addEventListener("click", saveImage);
