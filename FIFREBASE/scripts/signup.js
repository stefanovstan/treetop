const usernameLabel = document.getElementById("userLabel");
const passwordLabel = document.getElementById("passLabel");
const fullnameLabel = document.getElementById("nameLabel");
const useridLabel = document.getElementById("useridLabel")
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginbutton = document.getElementById("login-button");
const signupbutton = document.getElementById("signup-button");
const fullname = document.getElementById("full-name");
const userid = document.getElementById("userid");
var prevFocus = null;
var emailCorrect = null;
var emailInUse = null;
var usernameCorrect = null;
var usernameInUse = null;
signupbutton.disabled = true;

var upperCaseAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCaseAlphabet = upperCaseAlphabet.map(function(x){ return x.toLowerCase() })
var viableCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "_"];
viableCharacters.push.apply(viableCharacters, upperCaseAlphabet.concat(lowerCaseAlphabet));

var userEmails = [];
var userIds = [];

const updateArraysSignup = (data) => {
    data.forEach(doc => {
        const user = doc.data();
        userEmails.push(user.Email);
        userIds.push(user.Username);
    })
}

function emailAuth(email) {
    for (i = 0; i < userEmails.length; i++) {
        if (email.toUpperCase() === userEmails[i].toUpperCase()) {
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
    for (i = 0; i < userIds.length; i++) {
        if (user.toUpperCase() === userIds[i].toUpperCase()) {
            // Returns true if the username is already in use
            return true;
        } else {
            continue;
        }
    }
    // Returns false if the username is not already in use
    return false;
}

function setPrevFocus(element) {
    prevFocus = element;
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

document.addEventListener('click', function(event) {
    var isClickInside = fullname.contains(event.target);
    if(isClickInside) {
        nameLabel.style.color = "#3a80d6";
    } else {
        nameLabel.style.color = "#000";
    }
});

document.addEventListener('click', function(event) {
    var isClickInside = userid.contains(event.target);
    if(isClickInside) {
        useridLabel.style.color = "#3a80d6";
    } else {
        useridLabel.style.color = "#000";
    }
});

username.addEventListener('focus', e=> {
    if (prevFocus === null) {
        setPrevFocus(usernameLabel);
    }
    prevFocus.style.color = "#000";
    setPrevFocus(usernameLabel);
    usernameLabel.style.color = "#3a80d6";
});

username.addEventListener('keydown', e=> {
    usernameLabel.style.color = "#3a80d6";
});

password.addEventListener('focus', e=> {
    if (prevFocus === null) {
        setPrevFocus(passLabel);
    }
    checkUsername();
    prevFocus.style.color = "#000";
    setPrevFocus(passLabel);
    passLabel.style.color = "#3a80d6";
});

password.addEventListener('keydown', e=> {
    passwordLabel.style.color = "#3a80d6";
});

fullname.addEventListener('focus', e=> {
    if (prevFocus === null) {
        setPrevFocus(fullnameLabel);
    }
    checkEmail();
    prevFocus.style.color = "#000";
    setPrevFocus(fullnameLabel);
    fullnameLabel.style.color = "#3a80d6";
});

fullname.addEventListener('keydown', e=> {
    fullnameLabel.style.color = "#3a80d6";
});

userid.addEventListener('focus', e=> {
    if (prevFocus === null) {
        setPrevFocus(useridLabel);
    }
    checkFullName();
    prevFocus.style.color = "#000";
    setPrevFocus(useridLabel);
    useridLabel.style.color = "#3a80d6";
});

userid.addEventListener('keydown', e=> {
    useridLabel.style.color = "#3a80d6";
})

signupbutton.addEventListener('focus', e=> {
    passLabel.style.color = "#000";
});

loginbutton.addEventListener('focus', e=> {
    passLabel.style.color = "#000";
})

function enableButton() {
    signupbutton.disabled = false;
    signupbutton.style.backgroundColor = "#88c291";
    signupbutton.style.borderStyle = "none";
    signupbutton.style.color = "white";
    signupbutton.style.cursor = "pointer";
}

function disableButton() {
    signupbutton.disabled = true;
    signupbutton.style.backgroundColor = "white";
    signupbutton.style.borderStyle = "solid";
    signupbutton.style.color = "grey";
    signupbutton.style.cursor = "initial";
}

function signupHandler(event) {
    const MinimumLength = 1;
    const passwordMinimumLength = 6;
    if(password.value.length >= passwordMinimumLength && username.value.length >= MinimumLength 
        && fullname.value.length >= MinimumLength && userid.value.length >= MinimumLength) {
        enableButton();
    }
    else{
        disableButton();
    }
}

function checkEmail() {
    var emailValue = username.value;
    var confirmed = document.getElementById("confirmed");
    var denied = document.getElementById("denied");
    if (emailValue.length >= 1) {
        if (emailValue.includes("@") && emailValue.toUpperCase().includes(".COM") && !emailAuth(emailValue)) {
            username.style.marginLeft = "8.5%";
            confirmed.style.display = "inline-block";
            denied.style.display = "none";
            emailCorrect = true;
            emailInUse = false;
        }
        else if (emailValue.includes("@") && emailValue.toUpperCase().includes(".COM") && emailAuth(emailValue)) {
            username.style.marginLeft = "8.5%";
            denied.style.display = "inline-block";
            confirmed.style.display = "none";
            emailCorrect = true;
            emailInUse = true;
        } else {
            username.style.marginLeft = "8.5%";
            denied.style.display = "inline-block";
            confirmed.style.display = "none";
            emailCorrect = false;
            emailInUse = false;
        }
    } else {
        confirmed.style.display = "none";
        denied.style.display = "none";
        username.style.marginLeft = "0%";
        emailCorrect = null;
    }
}

function checkFullName() {
    var fullNameValue = fullname.value;
    var confirmedName = document.getElementById("confirmedName");

    if (fullNameValue.length >= 1) {
        fullname.style.marginLeft = "8.5%";
        confirmedName.style.display = "inline-block";
    } else {
        confirmedName.style.display = "none";
        fullname.style.marginLeft = "0%";
    }
}

function checkForViableCharacters(usernameValue) {
    let arr = usernameValue.split(/(?!$)/u);

    for (i = 0; i < arr.length; i++) {
        if (!viableCharacters.includes(arr[i])) {
            //Returns true if a character in the username is not viable
            return true;
        }
    }

    // Returns false if all characters in the username are viable
    return false;
}

function checkUsername() {
    var usernameValue = userid.value;
    var usernameValueLength = usernameValue.length;
    var confirmedUser = document.getElementById("confirmedUser");
    var deniedUser = document.getElementById("deniedUser");

    if (usernameValueLength >= 1) {
        if (!checkForViableCharacters(usernameValue) && !usernameAuth(usernameValue) && usernameValueLength >= 3) {
            userid.style.marginLeft = "8.5%";
            deniedUser.style.display = "none";
            confirmedUser.style.display = "inline-block";
            usernameCorrect = true;
            usernameInUse = false;
        } else if (!checkForViableCharacters(usernameValue) && usernameAuth(usernameValue)) {
            userid.style.marginLeft = "8.5%";
            deniedUser.style.display = "inline-block";
            confirmedUser.style.display = "none";
            usernameCorrect = true;
            usernameInUse = true;
        } else {
            userid.style.marginLeft = "8.5%";
            deniedUser.style.display = "inline-block";
            confirmedUser.style.display = "none";
            usernameCorrect = false;
            usernameInUse = false;
        }
    } else {
        userid.style.marginLeft = "0%";
        deniedUser.style.display = "none";
        confirmedUser.style.display = "none";
    }
}

document.addEventListener('click', function(event) {
    var isClickInside = username.contains(event.target);

    if(isClickInside) {
        
    } else {
        checkEmail();
    }
});

document.addEventListener('click', function(event) {
    var isClickInside = fullname.contains(event.target);

    if(isClickInside) {

    } else {
        checkFullName();
    }

});

document.addEventListener('click', function(event) {
    var isClickInside = userid.contains(event.target);

    if (isClickInside) {

    } else {
        checkUsername();
    }
});

password.addEventListener('keyup', signupHandler, false);
username.addEventListener('keyup', signupHandler, false);
fullname.addEventListener('keyup', signupHandler, false);
userid.addEventListener('keyup', signupHandler, false);


