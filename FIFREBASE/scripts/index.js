const username = document.getElementById("username");
const usernameLabel = document.getElementById("userLabel");
const password = document.getElementById("password");
const passwordLabel = document.getElementById("passLabel");
const loginbutton = document.getElementById("login-button");
const signupbutton = document.getElementById("signup-button");
loginbutton.disabled = true;

var userIdCorrect = null;
var userPasswordCorrect = null;
var userEmail = "";

var users = [];

const updateArraysLogin = (data) => {
    data.forEach(doc => {
        const user = doc.data();

        var Person = {
            Email: user.Email,
            Username: user.Username,
            Password: user.Password
        };
        users.push(Person);

    })
}

function emailAuth(email) {
    for (i = 0; i < users.length; i++) {
        if (email.toUpperCase() === users[i].Email.toUpperCase()) {
            // Returns true if the email is already in use
            return true;
        } else {
            continue;
        }
    }
    // Returns false if the email is not already in use
    return false;
}

function usernameAuth(user) {
    for (i = 0; i < users.length; i++) {
        if (user.toUpperCase() === users[i].Username.toUpperCase()) {
            // Returns true if the username is already in use
            return true;
        } else {
            continue;
        }
    }
    // Returns false if the username is not already in use
    return false;
}

function passwordAuth(id, password) {
    if (emailAuth(id) === true || usernameAuth(id) === true) {
        for (i = 0; i < users.length; i++) {
            if (id.toUpperCase() === users[i].Email.toUpperCase() || id.toUpperCase() === users[i].Username.toUpperCase()) {
                userIdCorrect = true;
                if (password === users[i].Password) {
                    userPasswordCorrect = true;
                    userEmail = users[i].Email;
                } else {
                    userPasswordCorrect = false;
                }
            }
        }
    } else {
        userIdCorrect = false;
    }
}

function returnUsernameFromEmail(email) {
    for (i = 0; i < users.length; i++) {
        if (email.toUpperCase() === users[i].Email.toUpperCase()) {
            return users[i].Username;
        } else {
            continue;
        }
    }
    return "";
}

document.addEventListener('click', function(event) {
    var isClickInside = username.contains(event.target);
    if(isClickInside) {
        usernameLabel.style.color = "#3a80d6";
    } else {
        usernameLabel.style.color = "#000";
    }
});

document.addEventListener('click', function(event) {
    var isClickInside = password.contains(event.target);
    if(isClickInside) {
        passLabel.style.color = "#3a80d6";
    } else {
        passLabel.style.color = "#000";
    }
});

username.addEventListener('focus', e=> {
    usernameLabel.style.color = "#3a80d6";
    passLabel.style.color = "#000";
});

username.addEventListener('keydown', e=> {
    usernameLabel.style.color = "#3a80d6";
});

password.addEventListener('focus', e=> {
    passLabel.style.color = "#3a80d6";
    usernameLabel.style.color = "#000";
});

password.addEventListener('keydown', e=> {
    passLabel.style.color = "#3a80d6";
}); 

signupbutton.addEventListener('focus', e=> {
    passLabel.style.color = "#000";
});

loginbutton.addEventListener('focus', e=> {
    passLabel.style.color = "#000";
});

function enableButton() {
    loginbutton.disabled = false;
    loginbutton.style.backgroundColor = "#88c291";
    loginbutton.style.borderStyle = "none";
    loginbutton.style.color = "white";
    loginbutton.style.cursor = "pointer";
}

function disableButton() {
    loginbutton.disabled = true;
    loginbutton.style.backgroundColor = "white";
    loginbutton.style.borderStyle = "solid";
    loginbutton.style.color = "grey";
    loginbutton.style.cursor = "initial";
}

function loginHandler(event) {
    if(password.value.length >= 6 && username.value.length >= 1) {
        enableButton();
    }
    else{
        disableButton();
    }
}

password.addEventListener('keyup', loginHandler, false);
username.addEventListener('keyup', loginHandler, false);

document.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log( { scrollTop, scrollHeight, clientHeight} );
})
