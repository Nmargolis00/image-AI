const signUp = async () => {
  const response = await fetch("/signup", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.replace('/signup');
  } else {
    alert(response.statusText);
  }
};


document.getElementById('btnSignUp').addEventListener('click',signUp)