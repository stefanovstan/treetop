const mqMedium = window.matchMedia( "(min-width: 376px) and (max-width: 765px)" );
const mqSmall = window.matchMedia( "(max-width: 375px)" );

var currentUsername = {
    Username: ""
}

document.addEventListener("DOMContentLoaded", event => {
    const db = firebase.firestore();
    db.collection('Users').get().then(snapshot => {
        updateArraysLogin(snapshot.docs);
    });
})

document.addEventListener('click', function(event) {
    var isClickInside = loginbutton.contains(event.target);
    var loginError = document.getElementById("loginError");
    var loginForm = document.querySelector(".login-form");
    var loginSplitter = document.getElementById("login-splitter");
    var usernameValue = document.getElementById("username").value;
    var passwordValue = document.getElementById("password").value;
    passwordAuth(usernameValue, passwordValue);

    if (isClickInside) {
        if (userIdCorrect === false) {
            loginError.innerHTML = 'The email or username entered does not belong to an account.';
            loginError.style.display = "block";
            loginSplitter.style.marginTop = "4%";

            if (mqMedium.matches || mqSmall.matches) {
                loginForm.style.height = "90%";
                loginForm.style.top = "52%";
            } else {
                loginForm.style.height = "62.5%";
            }
        }
        else if (userIdCorrect === true && userPasswordCorrect === false) {
            loginError.innerHTML = 'The password entered does not match the username or email.';
            loginError.style.display = "block";
            loginSplitter.style.marginTop = "4%";

            if (mqMedium.matches || mqSmall.matches) {
                loginForm.style.height = "90%";
                loginForm.style.top = "52%";
            } else {
                loginForm.style.height = "62.5%";
            }
        } else {
            firebase.auth().signInWithEmailAndPassword(userEmail, passwordValue).then(cred => {
                console.log(cred);
                console.log(firebase.auth().currentUser)
                // currentUsername.Username = returnUsernameFromEmail(userEmail);
                // window.getElementById("profile-username").innerHTML = String(currentUsername.Username);
                location.href = "home.html"
            });
        }
    } else {
        loginError.style.display = "none";
        loginSplitter.style.marginTop = "6.5%";

        if (mqMedium.matches || mqSmall.matches) {
            loginForm.style.height = "85%";
            loginForm.style.top = "50%";
        } else {
            loginForm.style.height = "55%";
        }
    }
})