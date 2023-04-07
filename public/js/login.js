const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log("fuck you")
        // If successful, redirect the browser to the profile page
        document.location.replace('/home');
      } else {
       console.log("whatever")
      }
    }
  };
  
  //This should first take you to a new page and then gather the information below. Once you sign up, you are redirected back to main page where you can log in
  // const signupFormHandler = async (event) => {
  //   event.preventDefault();
  
  //   //The IDs will need to match when the handlebars signup page is built
  //   const name = document.querySelector('#name-signup').value.trim();
  //   const email = document.querySelector('#email-signup').value.trim();
  //   const password = document.querySelector('#password-signup').value.trim();
  
  //   if (name && email && password) {
  //     const response = await fetch('/api/users', {
  //       method: 'POST',
  //       body: JSON.stringify({ name, email, password }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  
  //     if (response.ok) {
  //       document.location.replace('/');
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
  // };
  
  document
    .querySelector('.login-form')
    .addEventListener('click', loginFormHandler);
  
  // document
  //   .querySelector('.signup-form')
  //   .addEventListener('button', signupFormHandler);
  