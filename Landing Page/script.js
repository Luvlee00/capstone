document.getElementById('enrollNowBtn').addEventListener('click', function() {
    this.classList.toggle('hover');
});

document.getElementById('signUpBtn').addEventListener('click', function() {
    this.classList.toggle('hover');
});


    $('#videoModal').on('hidden.bs.modal', function () {
        var video = document.getElementById('modalVideo');
        video.pause();
        video.currentTime = 0;
    });
