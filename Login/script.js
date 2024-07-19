document.addEventListener('DOMContentLoaded', function () {
    const birthdayInput = document.getElementById('birthday');
    const ageInput = document.getElementById('age');

    function calculateAge() {
        if (!birthdayInput.value) {
            ageInput.value = '';
            return;
        }

        const birthday = new Date(birthdayInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDifference = today.getMonth() - birthday.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        ageInput.value = age;
    }

    birthdayInput.addEventListener('change', calculateAge);

    // Password toggle
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }
});

function formatPhoneNumber(event) {
    const input = event.target;
    // Remove all non-numeric characters
    input.value = input.value.replace(/\D/g, '');
}

function validateForm(event) {
    const phoneInput = document.getElementById('phone');
    // Check if phone number contains only digits
    if (!/^\d+$/.test(phoneInput.value)) {
        alert('Please enter a valid phone number.');
        event.preventDefault(); // Prevent form submission
    }
}

// Bind phone number formatting to the input field
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
});

function moveToNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

function moveToPrev(event, prevFieldID) {
    if (event.key === 'Backspace' && event.target.value === '') {
        document.getElementById(prevFieldID).focus();
    }
}
