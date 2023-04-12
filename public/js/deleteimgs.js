

const deleteImg = async (imgid) => {
    const response = await fetch('/api/image/delete', {
      method: "delete",
      body:JSON.stringify({imgid}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      window.location.replace("/dasboard");
    } else {
      alert(response.statusText);
    }
   
  };
  
  mydiv=document.querySelector('#imgDiv')
  mydiv.addEventListener("click", (event) => {
    if(event.target.tagName === 'BUTTON') {
    deleteImg(event.target.id)
      //console.log(event.target.id)
    }
  })