const mqMedium = window.matchMedia( "(min-width: 376px) and (max-width: 765px)" );
const mqSmall = window.matchMedia( "(max-width: 375px)" );

document.addEventListener("DOMContentLoaded", event => {
    const db = firebase.firestore();

    db.collection('Users').get().then(snapshot => {
        updateArraysSignup(snapshot.docs);
    });

})

document.addEventListener('click', function(event) {
    var isClickInside = signupbutton.contains(event.target);
    var usernameValue = document.getElementById("username").value;
    var passwordValue = document.getElementById("password").value;
    var signupError = document.getElementById("signupError");
    var loginSplitter = document.getElementById("login-splitter");
    var signupForm = document.querySelector(".signup-form");

    if(isClickInside) {
    
        if (emailCorrect === false && emailInUse === false) {
            signupError.innerHTML = 'This email is invalid.';
            signupError.style.display = "block";

            if (mqMedium.matches || mqSmall.matches) {

            } else {
                loginSplitter.style.marginTop = "4%";
                signupForm.style.height = "80%";
            }
        } 
        else if (emailCorrect === true && emailInUse === true) {
            signupError.innerHTML = 'This email is already in use.';
            signupError.style.display = "block";

            if (mqMedium.matches || mqSmall.matches) {
                
            } else {
                loginSplitter.style.marginTop = "4%";
                signupForm.style.height = "80%";
            }
        }
        else if (usernameCorrect === true && usernameInUse === true) {
            signupError.innerHTML = 'This username is already in use.';
            signupError.style.display = "block";

            if (mqMedium.matches || mqSmall.matches) {
                
            } else {
                loginSplitter.style.marginTop = "4%";
                signupForm.style.height = "80%";
            }
        }
        else if (usernameCorrect === false && usernameInUse === false && userid.value.length >= 3) {
            signupError.innerHTML = 'Usernames may only have letters, numbers, underscores and periods.';
            signupError.style.display = "block";

            if (mqMedium.matches || mqSmall.matches) {
                
            } else {
                loginSplitter.style.marginTop = "4%";
                signupForm.style.height = "80%";
            }
        }
        else if (usernameCorrect === false && usernameInUse === false && userid.value.length < 3) {
            signupError.innerHTML = 'Usernames must be longer than 3 characters.';
            signupError.style.display = "block";

            if (mqMedium.matches || mqSmall.matches) {
                
            } else {
                loginSplitter.style.marginTop = "4%";
                signupForm.style.height = "80%";
            }
        } else {
            // firebase.firestore().collection('Users').add({
            //     Email: usernameValue,
            //     FullName: fullname.value,
            //     Password: passwordValue,
            //     Username: userid.value
            // });

            firebase.auth().createUserWithEmailAndPassword(usernameValue, passwordValue).then(cred => {
                return firebase.firestore().collection('Users').doc(cred.user.uid).set({
                    Email: usernameValue,
                    FullName: fullname.value,
                    Password: passwordValue,
                    Username: userid.value,
                    Followers: 0,
                    Following: 0,
                    Acorns: 0,
                    Description: ""
                });

            }).then(() => {
                location.href = "index.html";
            });
        }
    } else {
        if (mqMedium.matches) {
            signupForm.style.height = "115%"
            signupError.style.display = "none";
        } else if (mqSmall.matches) {
            signupForm.style.height = "135%"
            signupError.style.display = "none";
        } else {
            signupError.style.display = "none";
            loginSplitter.style.marginTop = "8%";
            signupForm.style.height = "75%";
        }
    }
});