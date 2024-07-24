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
