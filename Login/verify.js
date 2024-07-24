import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBflGD3TVFhlOeUBUPaX3uJTuB-KEgd0ow",
    authDomain: "authentication-d6496.firebaseapp.com",
    databaseURL: "https://authentication-d6496-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "authentication-d6496",
    storageBucket: "authentication-d6496.appspot.com",
    messagingSenderId: "195867894399",
    appId: "1:195867894399:web:596fb109d308aea8b6154a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize reCAPTCHA verifier
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'normal', // Ensure it's 'normal', not 'invisible'
            'callback': (response) => {
                // reCAPTCHA solved, send the verification code
                sendVerificationCode();
            },
            'expired-callback': () => {
                // Handle expired reCAPTCHA
                console.log('reCAPTCHA expired');
            }
        }, auth);

        // Render the reCAPTCHA widget
        window.recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
            console.log('reCAPTCHA widget rendered with ID:', widgetId);
        }).catch((error) => {
            console.error('Error rendering reCAPTCHA widget:', error);
        });

    } catch (error) {
        console.error("Error initializing reCAPTCHA verifier:", error);
    }

    // Retrieve the phone number from localStorage
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
        console.error("Phone number not found in localStorage.");
        return;
    }

    // Function to send verification code
    function sendVerificationCode() {
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Save the confirmation result
                window.confirmationResult = confirmationResult;
                console.log('SMS sent successfully.');
            }).catch((error) => {
                // Error; SMS not sent
                console.error("Error sending SMS:", error);
            });
    }

    // Function to handle code verification
    document.getElementById('verifyButton').addEventListener('click', () => {
        const code = Array.from(document.querySelectorAll('.verification-code-input')).map(input => input.value).join('');
        if (!window.confirmationResult) {
            console.error("Confirmation result not found.");
            return;
        }

        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully
            const user = result.user;
            alert('Phone number verified successfully');
            window.location.href = 'home.html'; // Redirect to home page or another page
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.error("Error verifying code:", error);
            alert('Invalid verification code. Please try again.');
        });
    });

    // Resend verification code
    document.getElementById('resendCode').addEventListener('click', () => {
        window.recaptchaVerifier.render().then((widgetId) => {
            grecaptcha.reset(widgetId);
        }).catch((error) => {
            console.error('Error resetting reCAPTCHA widget:', error);
        });
        sendVerificationCode();
    });
});

// Function to move to the next input field
window.moveToNext = function (current, nextFieldID) {
    if (current.value.length === 1) {
        document.getElementById(nextFieldID).focus();
    }
}

// Function to move to the previous input field
window.moveToPrev = function (event, prevFieldID) {
    if (event.key === "Backspace" && event.target.value.length === 0) {
        document.getElementById(prevFieldID).focus();
    }
}
