
import axios  from 'axios';
const imageSearch = async (event) => {

    event.preventDefault();
  // prompt: "cat",
  // n: 1,
  // size: "1024x1024",
  const prompt = document.querySelector("#term").value.trim();

  const size = document.querySelector("#pic-size").value.trim();

  //  let myboj={prompt: serachTerm, n:NumberOfPics,size:picSize }
  // console.log(myboj)
//console.log({prompt, n,size })
  if (prompt  && size) {
    const response =  axios({
        method: 'post',
        url: '/login',
        data: {
            prompt:prompt,
            size:size
        }
      });
   
    try {
        const response = await fetch("/api/image/getimages", {
            method: "POST",
            body: JSON.stringify({prompt,size}),
            headers: { "Content-Type": "application/json" },
          });
     
    //       if (response.ok) {
        const data= response.json()
       console.log(data)
    //       } 
        //   else {
    //       
    //         console.log(data)
    //    // window.location.replace('/api/getimages')
         
    //       }
    } catch (error) {
       console.log(error)
    }
    
  }
};

document.getElementById("serchImg").addEventListener("click", imageSearch);
