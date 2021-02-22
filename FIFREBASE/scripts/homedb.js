var logoutButton = document.querySelector(".selector #C");

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        location.href = "index.html";
    })
})

function generatePostID(username) {
    var postID = ""
    var rand_num = Math.floor(100000 + Math.random() * 900000)
    postID = username + "-text-" + rand_num

    return postID
}

postButton.addEventListener('click', (e) => {
    const db = firebase.firestore();
    var author = ""
    var postID = ""
    if (textbox.value.length < 1 && !mediaPostValid) {
        // do nothing
    } else if (textbox.value.length >= 1 && textPostValid) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('Users').doc(user.uid).get().then(doc => {
                    author = doc.data().Username;
                    postID = generatePostID(author)
                    db.collection('Users').doc(user.uid).collection('Posts').add({
                        Likes: 0,
                        Author: author,
                        Comments: 0,
                        Content: textbox.value,
                        PostID: postID,
                        Time: new Date()
                    })
                    postModule.style.left = "-50%";
                    textbox.value = ""
                    postClicked = false;
                    postButton.style.backgroundColor = "white";
                    postButton.style.color = "#abecb6";
                    pencil.style.fill = "#abecb6";
                })
            }
        })
    } else if (mediaPostValid) {
        alert("Not null")
    }

})