const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response)
        // If successful, redirect the browser to the profile page
        window.location.replace("/home");
      } else {
     alert("Please enter both an email address and password.")
      }
    }
  
  };

  document
    .querySelector('.login-form')
    .addEventListener('click', loginFormHandler);
