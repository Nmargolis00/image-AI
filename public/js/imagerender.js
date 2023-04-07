const addPic = document.getElementById("get-photo")

const image = localStorage.getItem("img")
console.log(image)
// let imageEl = document.createElement("img")
// imageEl.setAttribute("src", image)

// addPic.append(image)
document.getElementById('image').src = image;