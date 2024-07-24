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
});

