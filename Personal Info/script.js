document.getElementById('birthday').addEventListener('change', function () {
    const birthday = new Date(this.value);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    document.getElementById('age').value = age;
});
