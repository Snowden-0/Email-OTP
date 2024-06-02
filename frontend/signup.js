document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("signupForm");

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const email = document.getElementById("email").value.trim();

        const user = { username, password, email };

        fetch('http://localhost:3000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'OTP sent') {
                sessionStorage.setItem('email', email);
                window.location.href = 'verify.html';
            } else {
                alert('Error during signup');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
