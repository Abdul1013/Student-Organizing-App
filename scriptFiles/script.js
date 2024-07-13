
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const message = document.getElementById('message');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulate user registration (in a real app, this should be handled by a server)
        if (username && password) {
            message.textContent = 'Registration successful!';
            message.style.color = 'green';
            // You would typically send the data to the server here for real registration.
        } else {
            message.textContent = 'Please fill in both fields.';
            message.style.color = 'red';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const message = document.getElementById('message');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.getElementById('gender').value;

        // Perform client-side validation
        if (!firstName || !lastName || !email || !password || !birthdate || !gender) {
            message.textContent = 'Please fill in all fields.';
            message.style.color = 'red';
            return;
        }

        // Simulate user registration (in a real app, this should be handled by a server)
        const user = {
            firstName,
            lastName,
            email,
            birthdate,
            gender
        };

        // You would typically send the data to the server here for real registration.
        // For demonstration purposes, we'll display the user data.
        message.innerHTML = `
            Registration successful!<br>
            First Name: ${user.firstName}<br>
            Last Name: ${user.lastName}<br>
            Email: ${user.email}<br>
            Date of Birth: ${user.birthdate}<br>
            Gender: ${user.gender}
        `;
        message.style.color = 'green';
    });
});