const imageShare = async () => {
const image_src = document.getElementById("image").src

const response = await fetch ("/api/image/community", {
    method: "POST",
    body: JSON.stringify({image_src}),
    headers: { 'Content-Type': 'application/json' },

})
if (response.ok){
    document.location.replace("/")
}
}




document.getElementById("share").addEventListener("click", imageShare);