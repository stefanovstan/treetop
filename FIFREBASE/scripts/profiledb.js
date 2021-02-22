const logoutButton = document.querySelector(".selector #C");
const loggedOut = document.querySelector('.follow-button-loggedout');
const loggedIn = document.querySelector('.settings-button-loggedin');
const postsContainer = document.querySelector('.Posts');
const likeIcon = document.querySelector('#heart');
const editProfile = document.querySelector('.edit-profile-button-loggedin')

document.addEventListener("DOMContentLoaded", event => {
    const db = firebase.firestore();
    const storage = firebase.storage();
    console.log(firebase.auth().currentUser)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
            console.log(user.uid);
            db.collection('Users').doc(user.uid).get().then(doc => {
                const username = `
                    <label>${doc.data().Username}</label>
                `;
                document.getElementById("profile-username").innerHTML = username;

                const fullname = `
                    <label>${doc.data().FullName}</label>
                `;
                document.getElementById("full-name").innerHTML = fullname;

                const following = `
                    <label>${doc.data().Following}</label>
                `;
                document.getElementById("profile-following").innerHTML = following;

                const followers = `
                    <label>${doc.data().Followers}</label>
                `;
                document.getElementById("profile-followers").innerHTML = followers;

                const acorns = `
                    <label>${doc.data().Acorns}</label>
                `;
                document.getElementById("profile-acorns").innerHTML = acorns;

                document.getElementById("profile-description").value = doc.data().Description;
            });

            document.querySelector(".sk-chase-posts").style.display = "initial";
            db.collection('Users').doc(user.uid).collection('Posts').orderBy("Time", "desc").get().then(data => {
                data.forEach(test => {
                    if (test.data().PostID.split('-', 2)[1] === "text") {
                        var date = new Date(test.data().Time * 1000)
                        const postElement = document.createElement('div');
                        postElement.classList.add('Post');
                        postElement.innerHTML = `
                            <div class="text-post" id="${test.data().PostID}" onclick="trackCurrentPost(this.id)" onmouseover="showShadow(this.id)" onmouseout="hideShadow(this.id)">
                                <img src="imgs/avatar.jpg" alt="avatar" id="avatar">
                                <label id="username">${test.data().Author}</label>
                                <label id="time-stamp">${findDatePosted(date)}</label>
                                <div class="text-content">
                                    <textarea id="text" cols="74" rows="5" readonly>${test.data().Content}</textarea>
                                </div>
                                <label id="post-attribute-likes">${test.data().Likes}</label>
                                <label id="post-subattribute-likes">Likes</label>
                                <label id="post-attribute-comments">${test.data().Comments}</label>
                                <label id="post-subattribute-comments">Comments</label>

                                <div class="post-settings-list">
                                    <label id="delete-option">Delete Post</label>
                                </div>  

                                <svg id="post-settings" width="2em" height="2em" onclick="setTimeout(showPostSettings, 10)" viewBox="0 0 16 16" class="bi bi-three-dots" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                                <div id="comment_icon">
                                    <svg id="comment-section-icon" onclick="showCommentSection()" class="bi bi-chat" width="2.2em" height="2.2em" viewBox="0 0 16 16" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    </svg>
                                </div>
                                
                                <div id="like_icon">
                                    <svg id="heart" onclick="setTimeout(likePost, 10)" class="bi bi-heart" width="2em" height="2em" viewBox="0 0 16 16" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg>
                                </div>
                            </div>
                        `;
                        postsContainer.appendChild(postElement);
                        checkIfLiked(test.data().PostID)
                    } else if (test.data().PostID.split('-', 2)[1] === "media") {
                        var date = new Date(test.data().Time * 1000)
                        const postElement = document.createElement('div');
                        postElement.classList.add('Post');
                        postElement.innerHTML = `
                            <div class="media-post" id="${test.data().PostID}" onclick="trackCurrentPost(this.id)" onmouseover="showShadow(this.id)" onmouseout="hideShadow(this.id)">
                                <img src="imgs/avatar.jpg" alt="avatar" id="avatar">
                                <label id="username">${test.data().Author}</label>
                                <label id="time-stamp">${findDatePosted(date)}</label>
                                <div class="media-content">
                    
                                </div>
                    
                                <label id="post-attribute-likes">${test.data().Likes}</label>
                                <label id="post-subattribute-likes">Likes</label>
                                <label id="post-attribute-comments">${test.data().Comments}</label>
                                <label id="post-subattribute-comments">Comments</label>

                                <div class="post-settings-list">
                                    <label id="delete-option">Delete Post</label>
                                </div>  
                    
                                <svg id="post-settings" width="2em" height="2em" onclick="setTimeout(showPostSettings, 10)" viewBox="0 0 16 16" class="bi bi-three-dots" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                                
                                <div id="comment_icon">
                                    <svg id="comment-section-icon" onclick="showCommentSection()" class="bi bi-chat" width="2.2em" height="2.2em" viewBox="0 0 16 16" fill=" #88c291" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                                    </svg>
                                </div>

                                <div id="like_icon">
                                    <svg id="heart" onclick="setTimeout(likePost, 10)" class="bi bi-heart" width="2em" height="2em" viewBox="0 0 16 16" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg>
                                </div>

                                <br>
                                <div class="media-comments">
                                    <label id="comment-username-slot2"></label>
                                    <label id="comment-slot2"></label>
                                </div>
                            </div>
                        `;
                        postsContainer.append(postElement);
                        checkIfLiked(test.data().PostID)
                        var newMediaPostContent = document.querySelector("#" + test.data().PostID + " .media-content");
                        newMediaPostContent.style.backgroundSize = test.data().BackgroundSize;
                        newMediaPostContent.style.backgroundPosition = test.data().BackgroundPosition;

                        if (test.data().Content.length > 0) {
                            const author = `
                                <label>${test.data().Author}</label>
                            `;
                            document.querySelector("#" + test.data().PostID + " #comment-username-slot2").innerHTML = author;

                            const text_content = `
                                <label>${test.data().Content}</label>
                            `;
                            document.querySelector("#" + test.data().PostID + " #comment-slot2").innerHTML = text_content;
                        }

                        storage.ref('Users/' + user.uid + '/' + test.data().PostID).getDownloadURL().then(imgURL => {
                            var contentURL = "url(" + imgURL + ")";
                            newMediaPostContent.style.backgroundImage = contentURL;
                        })
                    }
                })
                document.querySelector(".sk-chase-posts").style.display = "none";
            });
        } else {
          // User not logged in or has just logged out.
        }
      });
})

const setupUI = (user) => {
    if (user) {
        loggedIn.style.display = "initial";
        loggedOut.style.display = "none";
    } else {
        loggedIn.style.display = "none";
        loggedOut.style.display = "initial;"
    }
}

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        location.href = "index.html";
    })
})

function generatePostID(username, type) {
    var postID = ""
    var rand_num = Math.floor(100000 + Math.random() * 900000)
    if (type === "text") { postID = username + "-text-" + rand_num }
    if (type === "media") { postID = username + "-media-" + rand_num }

    return postID
}

postButton.addEventListener('click', (e) => {
    const db = firebase.firestore();
    const storage = firebase.storage();
    var author = ""
    var postID = ""

    if (mediaPostValid && previewMediaPostOpen) {
        closePreviewMediaPost()
    }

    if (textbox.value.length > text_box_max) {
        postButton.style.backgroundColor = "white";
        postButton.style.color = "#abecb6";
        pencil.style.fill = "#abecb6";
    }

    if (textbox.value.length < 1 && !mediaPostValid) {
        // do nothing
    } else if (textbox.value.length >= 1 && textPostValid && !mediaPostValid) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('Users').doc(user.uid).get().then(doc => {
                    author = doc.data().Username;
                    postID = generatePostID(author, "text")
                    db.collection('Users').doc(user.uid).collection('Posts').add({
                        Likes: 0,
                        Author: author,
                        Comments: 0,
                        Content: textbox.value,
                        PostID: postID,
                        Time: new Date()
                    })
                    addTextPost(author, textbox.value, postID);
                    postModule.style.left = "-50%";
                    textbox.value = ""
                    textbox.style.minHeight = "8em";
                    textbox.style.height = "8em";
                    textbox.style.maxHeight = "16em";
                    postClicked = false;
                    postButton.style.backgroundColor = "white";
                    postButton.style.color = "#abecb6";
                    pencil.style.fill = "#abecb6";
                })
            }
        })
    } else if ((mediaPostValid && textbox.value.length == 0) || (mediaPostValid && textbox.value.length >= 1 && textbox.value.length <= 100)) {
        // alert("Not null")

        if (backgroundPosition === null || backgroundSize === null) {
            autoResizeImage(previewImageWidth, previewImageHeight)
        }
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('Users').doc(user.uid).get().then(doc => {
                    author = doc.data().Username;
                    postID = generatePostID(author, "media")
                    content_value = textbox.value;
                    db.collection('Users').doc(user.uid).collection('Posts').add({
                        Likes: 0,
                        Author: author,
                        Comments: 0,
                        Content: textbox.value,
                        PostID: postID,
                        Time: new Date(),
                        BackgroundSize: backgroundSize,
                        BackgroundPosition: backgroundPosition
                    })
                    document.querySelector(".sk-chase-post-button").style.display = "initial";
                    storage.ref('Users/' + user.uid + "/" + postID).put(media_file).then(function () {
                        document.querySelector(".sk-chase-post-button").style.display = "none";
                        addMediaPost(author, postID);
                        var newMediaPostContent = document.querySelector("#" + postID + " .media-content");
                        newMediaPostContent.style.backgroundSize = backgroundSize;
                        newMediaPostContent.style.backgroundPosition = backgroundPosition;
                        var contentURL = "url(" + document.getElementById("preview-image").getAttribute("src") + ")";
                        newMediaPostContent.style.backgroundImage = contentURL;

                        if (content_value.length > 0) {
                            const content_author = `
                                <label>${author}</label>
                            `;
                            document.querySelector("#" + postID + " #comment-username-slot2").innerHTML = content_author;

                            const text_content = `
                                <label>${content_value}</label>
                            `;
                            document.querySelector("#" + postID + " #comment-slot2").innerHTML = text_content;
                        }

                        document.querySelector('#file-selection').value = ''
                        document.querySelector('#preview-image').style.display = 'none'
                        postModule.style.left = "-50%";
                        textbox.value = ""
                        mediaPostValid = false;
                        postClicked = false;
                        postButton.style.backgroundColor = "white";
                        postButton.style.color = "#abecb6";
                        pencil.style.fill = "#abecb6";
                    })
                })
            }
        })
    }

})

function findDatePosted(date) {
    var months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
    var year = date.getYear() - 69
    var today = new Date()
    date.setYear((date.getYear() - 69))
    var diffMs = (today - date); 
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    if (diffDays < 1) {
        if (diffMins < 1 && diffHrs < 1) {
            return "Less than a minute ago"
        } else if (diffMins > 1 && diffHrs < 1) {
            return diffMins + " Minutes Ago"
        } else if (diffHrs >= 1) {
            return diffHrs + " Hours Ago"
        }
    } else if (diffDays > 1 && today.getYear() === date.getYear()) {
        return months[date.getMonth()] + " " + date.getDate()
    } else {
        return months[date.getMonth()] + " " + date.getDate() + ", " + year
    }

}

function checkIfLiked(id) {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('Users').doc(user.uid).collection('LikedPosts').get().then(data => {
                data.forEach(test => {
                    if (test.data().post_id === id) {
                        document.querySelector("#" + id + " #like_icon").innerHTML = `
                        <svg id="heart" onclick="setTimeout(likePost, 10)" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                        `
                    }
                })
            })
        }
    })
}

function likePost() {
    const db = firebase.firestore();
    id = currPost.name;
    console.log(id)

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('Users').doc(user.uid).collection('LikedPosts').get().then(data => {
                if (data.size === 0) {
                    document.querySelector("#" + id + " #like_icon").innerHTML = `
                    <svg id="heart" onclick="setTimeout(likePost, 10)" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    `
                    db.collection('Users').doc(user.uid).collection('LikedPosts').add({
                        post_id: id
                    })

                    db.collection('Users').doc(user.uid).collection('Posts').get().then(data => {
                        data.forEach(snapshot => {
                            if (snapshot.data().PostID === id) {
                                db.collection('Users').doc(user.uid).collection('Posts').doc(snapshot.id).set({
                                    Likes: snapshot.data().Likes + 1
                                },
                                { merge: true })
                                document.querySelector("#" + id + " #post-attribute-likes").innerHTML = `${snapshot.data().Likes + 1}`
                            }
                        })
                    })
                } else {
                    postLiked = false;
                    data.forEach(test => {
                        if (test.data().post_id === id) {
                            postLiked = true;
                            document.querySelector("#" + id + " #like_icon").innerHTML = `
                            <svg id="heart" onclick="setTimeout(likePost, 10)" class="bi bi-heart" width="2em" height="2em" viewBox="0 0 16 16" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                            `
                            db.collection('Users').doc(user.uid).collection('LikedPosts').doc(test.id).delete().then(function() {
                                db.collection('Users').doc(user.uid).collection('Posts').get().then(data => {
                                    data.forEach(snapshot => {
                                        if (snapshot.data().PostID === id) {
                                            db.collection('Users').doc(user.uid).collection('Posts').doc(snapshot.id).set({
                                                Likes: snapshot.data().Likes - 1
                                            },
                                            { merge: true })
                                            document.querySelector("#" + id + " #post-attribute-likes").innerHTML = `${snapshot.data().Likes - 1}`
                                        }
                                    })
                                })
                            })
                        } else {
                        }
                    })
                    if (!postLiked) {
                        document.querySelector("#" + id + " #like_icon").innerHTML = `
                        <svg id="heart" onclick="setTimeout(likePost, 10)" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-heart-fill" fill="#88c291" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                        `
                        db.collection('Users').doc(user.uid).collection('LikedPosts').add({
                            post_id: id
                        })

                        db.collection('Users').doc(user.uid).collection('Posts').get().then(data => {
                            data.forEach(snapshot => {
                                if (snapshot.data().PostID === id) {
                                    db.collection('Users').doc(user.uid).collection('Posts').doc(snapshot.id).set({
                                        Likes: snapshot.data().Likes + 1
                                    },
                                    { merge: true })
                                    document.querySelector("#" + id + " #post-attribute-likes").innerHTML = `${snapshot.data().Likes + 1}`
                                }
                            })
                        })
                    }
                }
            })
        }
    })
}

function deletePost(id) {
    const db = firebase.firestore();
    const storage = firebase.storage();
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('Users').doc(user.uid).collection('Posts').get().then(data => {
                data.forEach(snapshot => {
                    if (snapshot.data().PostID === id) {
                        db.collection('Users').doc(user.uid).collection('Posts').doc(snapshot.id).delete().then(function() {
                            var node = document.getElementById(id);
                            if (node.parentNode) {
                                node.parentNode.removeChild(node);
                            }

                            if (id.split('-', 2)[1] === "media") {
                                storage.ref('Users/' + user.uid + "/" + id).delete().then(function () {
                                    // do nothing
                                })
                            }
                        })
                    }
                })
            })
        }
    })
}

function autoResizeImage(width, height) {
    if (width <= height) {
        backgroundPosition = "-10px -" + (height/(width/720) - .24)/3 + "px";
        backgroundSize = width/((width/720) - .24) + "px " + height/((width/720) - .24) + "px";
    } else if (width == 1920 && height == 1080) {
        backgroundPosition = "0px 0px";
        backgroundSize = width/((height/430)) + "px " + height/((height/430)) + "px";
    } else if (width < 1920 && height > 1080) {
        backgroundPosition = "0px 0px";
        backgroundSize = width/((height/610)) + "px " + height/((height/610)) + "px";
    } else {
        backgroundPosition = "0px 0px";
        backgroundSize = width/((height/570)) + "px " + height/((height/570)) + "px";
    }
}

editProfile.addEventListener('click', e => {
    const db = firebase.firestore();
    const storage = firebase.storage();

    var fullname = document.querySelector("#full-name")
    var description = document.querySelector("#profile-description")
    var fullnameTextbox = document.querySelector("#profile-fullname-textbox")
    var descriptionTextbox = document.querySelector("#profile-description-textbox")
    var editProfileButton = document.querySelector('#edit-profile')
    var confirmEdited = document.querySelector('#confirm-edited-profile')

    if (confirmEdited.style.display == "initial") {
        editProfileButton.style.display = "initial"
        confirmEdited.style.display = "none"

        fullname.style.display = "block"
        description.style.display = "block"

        description.value = descriptionTextbox.value
        fullname.textContent = fullnameTextbox.value

        fullnameTextbox.style.display = "none"
        descriptionTextbox.style.display = "none"

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.collection('Users').doc(user.uid).update({
                    FullName: fullnameTextbox.value,
                    Description: descriptionTextbox.value
                })
            }
        })
    } else {
        editProfileButton.style.display = "none"
        confirmEdited.style.display = "initial"
        var descriptionValue = description.value;
        var fullnameValue = fullname.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()

        fullname.style.display = "none"
        description.style.display = "none"

        fullnameTextbox.value = fullnameValue;
        descriptionTextbox.value = descriptionValue;

        fullnameTextbox.style.display = "block"
        descriptionTextbox.style.display = "block"
    }

})