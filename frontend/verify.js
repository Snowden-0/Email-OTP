document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("verifyForm");

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const otp = document.getElementById("otp").value.trim();

        const verificationData = { email, otp };

        fetch('http://localhost:3000/api/user/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(verificationData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Signup successful') {
                window.location.href = 'success.html';
            } else {
                alert('Invalid OTP or email. Please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
