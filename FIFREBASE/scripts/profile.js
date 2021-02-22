const mediaPost = document.querySelector(".media-post");
const textPost = document.querySelector(".text-post");
const commentSection = document.querySelector(".comment-section");
const commentSectionIcon = document.getElementById("comment-section-icon");
const commentSectionBackArrow = document.getElementById("comment-section-backarrow");
const postButton = document.querySelector(".post-button");
const postModule = document.querySelector(".post-module");
const postModuleBackButton = document.querySelector("#post-module-backarrow");
const postModuleImageButton = document.querySelector("#image-button");
const fileSelection = document.querySelector("#file-selection");
const postOptionsList = document.querySelector("#post-options-list");
const postComment = document.getElementById("post");
const distanceFromBanner = 450;
const imageIcon = document.getElementById("image-icon");
const pencil = document.getElementById("pencil");
const concealPostModuleMessage = document.querySelector(".conceal-post-module-message");
const concealPostModuleMessageYes = document.querySelector(".conceal-post-module-message #yes");
const concealPostModuleMessageNo = document.querySelector(".conceal-post-module-message #no");

var characterCount = document.getElementById("characters-left");
var savePosition = 0;
var selectedPost = "";
// var previewImageSrc = null;
var previewImageHeight = 0;
var previewImageWidth = 0;
var media_file = null;
var text_box_max = 420;
var text_box_first_warning = 20;
var text_box_second_warning = 50;

var backgroundPosition = null;
var backgroundSize = null;
var videoUrl = null;

var screenHeight = null;
var screenTop = null;
var count = 50;
var postClicked = false;
var textPostValid = false;
var mediaPostValid = false;
var postModuleHome = true;
var postOptionsListShowing = false;
var profileModuleShowing = false;
var deletingPost = false;
var postSettingsClicked = false;
var reopenCommentSection = false;
var previewMediaPostOpen = false;
var videoSelected = false;

var currPost = {
    top: null,
    bottom: null,
    id: null,
    name: null
}

var prevPost = {
    top: null,
    bottom: null,
    id: null,
    name: null
}

var post = {
    top: null,
    bottom: null,
    id: null,
    name: null
}

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop } = document.documentElement;
    screenHeight = scrollHeight;
    screenTop = scrollTop;

    console.log( { screenTop, screenHeight } )
    // var rect = mediaPost.getBoundingClientRect();
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    // var text = textPost.getBoundingClientRect();
    // console.log(text.top, text.right, text.bottom, text.left);
})

function deepCopyCurrPost(top, bottom, id, name) {
    currPost.top = top;
    currPost.bottom = bottom;
    currPost.id = id;
    currPost.name = name;
}

function deepCopyPrevPost(top, bottom, id, name) {
    prevPost.top = top;
    prevPost.bottom = bottom;
    prevPost.id = id;
    prevPost.name = name;
}

function trackCurrentPost(clicked_id) {
    var coordinates = document.getElementById(clicked_id).getBoundingClientRect();

    if (currPost.id === null && prevPost.id === null) {
        deepCopyCurrPost(coordinates.top, coordinates.bottom, document.getElementById(clicked_id), clicked_id);
    }
    else if (prevPost.id === null && currPost.id !== null) {
        deepCopyPrevPost(currPost.top, currPost.bottom, currPost.id, currPost.name);
        deepCopyCurrPost(coordinates.top, coordinates.bottom, document.getElementById(clicked_id), clicked_id);
    } else {
        deepCopyPrevPost(currPost.top, currPost.bottom, currPost.id, currPost.name);
        deepCopyCurrPost(coordinates.top, coordinates.bottom, document.getElementById(clicked_id), clicked_id);
    }

    console.log(currPost.top + " " + currPost.name);
    console.log(prevPost.top + " " + prevPost.name);
}

function showCommentSection() {
    var coordiantes = commentSection.getBoundingClientRect();
    setTimeout(function() { selectedPost = currPost.name; }, 50)

    setTimeout(function() {
        if (currPost.id === null) {
            //do nothing
        }

        else if (screenTop === null) {
            var postsContainer = document.querySelector('.Posts').childNodes;
            console.log(postsContainer[5].id)
            commentSection.style.display = "initial";
            
            currPost.id.style.boxShadow = " 0 0 25px #678f6d";
        }

        else if (prevPost.name === currPost.name || currPost.name !== null) {
            if (screenTop === 0) {
                var sizeOfPost = currPost.bottom - currPost.top;
                commentSection.style.height = sizeOfPost + "px";
                commentSection.style.marginTop = "0px";
                commentSection.style.display = "initial";
                currPost.id.style.boxShadow = " 0 0 25px #678f6d";
            }

            else if (screenTop !== 0) {
                if (checkIfFirstPost(currPost.top, screenTop)) {
                    var sizeOfPost = currPost.bottom - currPost.top;
                    commentSection.style.marginTop = "0px";
                    commentSection.style.height = sizeOfPost + "px";
                    commentSection.style.display = "initial";
                    currPost.id.style.boxShadow = " 0 0 25px #678f6d";
                } else {
                    var sizeOfPost = currPost.bottom - currPost.top;
                    commentSection.style.marginTop = (screenTop + currPost.top) - distanceFromBanner + "px";
                    commentSection.style.height = sizeOfPost + "px";
                    commentSection.style.display = "initial";
                    currPost.id.style.boxShadow = " 0 0 25px #678f6d";
                }
            }
        }

        else if (prevPost.name !== currPost.name && currPost.name !== null && prevPost.name !== null) {
            var sizeOfPost = currPost.bottom - currPost.top;
            if (above(currPost.top, prevPost.top)) {
                commentSection.style.marginTop = "-" + (prevPost.top - currPost.top) + "px";
                commentSection.style.height = sizeOfPost + "px";
                commentSection.style.display = "initial";
                currPost.id.style.boxShadow = " 0 0 25px #678f6d";
                prevPost.id.style.boxShadow = "none";
            } else {
                commentSection.style.marginTop = (currPost.top - prevPost.top) + "px";
                console.log((currPost.top + " " + prevPost.top));
                commentSection.style.height = sizeOfPost + "px";
                commentSection.style.display = "initial";
                currPost.id.style.boxShadow = " 0 0 25px #678f6d";
                prevPost.id.style.boxShadow = "none";
            }
        }
        
    }, 1);
}

function concealCommentSection() {
    commentSection.style.display = "none";
    currPost.id.style.boxShadow = "initial";
}

function checkIfFirstPost(top, screenTop) {
    if ((top + screenTop) === 225) {
        return true;
    } else {
        return false;
    }
}

function above(currTop, prevTop) {
    if (currTop < prevTop) {
        return true;
    } else {
        return false;
    }
}

function showShadow(id) {
    document.getElementById(id).style.boxShadow = " 0 0 25px #678f6d";
}

function hideShadow(id) {
    if (commentSection.style.display === "initial" && id === selectedPost) {
        document.getElementById(id).style.boxShadow = " 0 0 25px #678f6d";
    }
    else {
        document.getElementById(id).style.boxShadow = "initial";
    }
}

postButton.addEventListener('click', e=> {
    postModule.style.left = "1%";
    postClicked = true;

    if (textbox.value.length < 1) {
        postButton.style.backgroundColor = "white";
        postButton.style.color = "#abecb6";
        pencil.style.fill = "#abecb6";
    } else if (textbox.value.length >= 1) {
        postButton.style.backgroundColor = "#abecb6";
        postButton.style.color = "white";
        pencil.style.fill = "white";
    }
});

document.addEventListener('click', function(event) {
    var profileModule = document.getElementById("profile-module");
    var profile = document.getElementById("logged-in-user");
    var isClickInside = profile.contains(event.target);

    if (isClickInside) {
        // profileModule.style.opacity = "100%";
        profileModule.style.display = "initial";
        document.querySelector("#file-not-supported").style.display = "none";
    } else {
        // profileModule.style.opacity = "0%";
        profileModule.style.display = "none";
        document.querySelector("#file-not-supported").style.display = "none";
        
    }
});

(function(){
    var measurer = $('<span>', {
                                   
        style: "display:inline-block;word-break:break-word;visibility:hidden;white-space:pre-wrap;"})
       .appendTo('body');
    function initMeasurerFor(textarea){
      if(!textarea[0].originalOverflowY){
          textarea[0].originalOverflowY = textarea.css("overflow-y");    
      }  
      var maxWidth = textarea.css("max-width");
      measurer.text(textarea.text())
          .css("max-width", maxWidth == "none" ? textarea.width() + "px" : maxWidth)
          .css('font',textarea.css('font'))
          .css('overflow-y', textarea.css('overflow-y'))
          .css("max-height", textarea.css("max-height"))
          .css("min-height", textarea.css("min-height"))
          .css("min-width", textarea.css("min-width"))
          .css("padding", textarea.css("padding"))
          .css("border", textarea.css("border"))
          .css("box-sizing", textarea.css("box-sizing"))
    }
    function updateTextAreaSize(textarea){
        textarea.height(measurer.height());
    }
    $('textarea.autofit').on({
        input: function(){      
              var text = $(this).val();  
            if($(this).attr("preventEnter") == undefined){
                 text = text.replace(/[\n]/g, "<br>&#8203;");
            }
              measurer.html(text);                       
            updateTextAreaSize($(this));       
        },
        focus: function(){
         initMeasurerFor($(this));
        },
        keypress: function(e){
            if(e.which == 13 && $(this).attr("preventEnter") != undefined){
              e.preventDefault();
          }
        }
    });
})();

postButton.addEventListener('mouseover', e => {
    if (postClicked === true) {
        postButton.style.cursor = "initial";
        postButton.style.boxShadow = "none";
    } else {
        postButton.style.cursor = "pointer";
        postButton.style.boxShadow = "0 0 25px #79a780";
    }
});

postButton.addEventListener('mouseout', e => {

    if (postClicked === true) {
    } else {
        postButton.style.boxShadow = "none";
    }
});

document.getElementById("post-button-label").addEventListener('mouseover', e=> {
    if (postClicked === true) {
        document.getElementById("post-button-label").style.cursor = "default";
    } else {
        document.getElementById("post-button-label").style.cursor = "pointer";
    }
})

document.querySelector('.autofit').addEventListener('keyup', function(event) {
    var textbox = document.querySelector('.autofit');

    if (textbox.value.length === 0) {
        postButton.style.backgroundColor = "white";
        postButton.style.color = "#abecb6";
        postButton.style.boxShadow = "none";
        postButton.style.cursor = "none";
        pencil.style.fill = "#abecb6";
        postClicked = true;
        textPostValid = false;
    }
    if (textbox.value.length >= 1) {
        postButton.style.backgroundColor = "#abecb6";
        postButton.style.color = "white";
        pencil.style.fill = "white";
        postClicked = false;
        textPostValid = true;
    }
    if (textbox.value.length >= (text_box_max - text_box_second_warning) && textbox.value.length <= (text_box_max - text_box_first_warning)) {
        characterCount.style.display = "initial";
        characterCount.style.color = "#ffe629";
        var updatedCount = `
            <label>${text_box_max-textbox.value.length}</label>
        `;
        characterCount.innerHTML = updatedCount;
        textPostValid = true;
    }
    if (textbox.value.length > (text_box_max - text_box_first_warning)) {
        postClicked = false;
        characterCount.style.display = "initial";
        characterCount.style.color = "#f72d2d";
        var updatedCount = `
            <label>${text_box_max - textbox.value.length}</label>
        `;
        characterCount.innerHTML = updatedCount;
        textPostValid = true;
    } 
    if (textbox.value.length > text_box_max) {
        postButton.style.backgroundColor = "white";
        postButton.style.color = "#abecb6";
        pencil.style.fill = "#abecb6";
        postClicked = true;
        textPostValid = false;
    }
    if (textbox.value.length < (text_box_max - text_box_second_warning)) {
        characterCount.style.display = "none";
    }
});

function concealPostModule() {

    if (textbox.value.length > 0 || mediaPostValid) {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(".treeTop-navbar").style.zIndex = "0";
        document.querySelector("#profile-module").style.zIndex = "0";
        concealPostModuleMessage.style.display = "initial";
        concealPostModuleMessage.style.marginTop = screenTop - 50 + "px";
    } else {
        postModule.style.left = "-50%";
        resetPostButton()
    }
}

function resetPostButton() {
    postButton.style.backgroundColor = "white";
    postButton.style.color = "#abecb6";
    pencil.style.fill = "#abecb6";
    postButton.style.hideShadow
    postClicked = false;
}

concealPostModuleMessageYes.addEventListener('click', e=> {
    if (deletingPost) {
        document.querySelector("body").style.overflow = "initial";
        concealPostModuleMessage.style.display = "none";
        document.querySelector(".treeTop-navbar").style.zIndex = "999";
        document.querySelector("#profile-module").style.zIndex = "999";
        deletePost(currPost.name);
        deletingPost = false;
    }

    if (mediaPostValid && document.querySelector('.preview-media-post')) {
        closePreviewMediaPost()
    }

    textbox.value = ""
    document.querySelector("body").style.overflow = "initial";
    document.querySelector('body').style.overflowX = "hidden";
    concealPostModuleMessage.style.display = "none";
    postModule.style.left = "-50%";
    document.querySelector(".treeTop-navbar").style.zIndex = "999";
    document.querySelector("#profile-module").style.zIndex = "999";
    characterCount.style.display = "none";
    postButton.style.backgroundColor = "white";
    postButton.style.color = "#abecb6";
    pencil.style.fill = "#abecb6";
    document.querySelector('#file-selection').value = ''
    document.querySelector('#preview-image').style.display = 'none'
    textbox.style.minHeight = "8em";
    textbox.style.height = "8em";
    textbox.style.maxHeight = "16em";
    mediaPostValid = false;
    postClicked = false;
    text_box_max = 420;
    videoSelected = false;
    videoUrl = null;
    document.querySelector('#video-label').style.display = "none";
})

concealPostModuleMessageNo.addEventListener('click', e=> {
    document.querySelector("body").style.overflow = "initial";
    document.querySelector("body").style.overflowX = "hidden";
    concealPostModuleMessage.style.display = "none";
    document.querySelector(".treeTop-navbar").style.zIndex = "999";
    document.querySelector("#profile-module").style.zIndex = "999";
})

postModule.addEventListener('mouseover', e => {
    postModuleBackButton.style.opacity = "100%";
})

postModule.addEventListener('mouseout', e => {
    postModuleBackButton.style.opacity = "0%";
})

function getVideoImageCallback(img, currentTime, event) {
    document.querySelector('#preview-image').style.display = "none";
    $('#preview-image').attr('src', img.src);
    setTimeout(preloadImage, 500)
    document.querySelector('#video-label').style.display = "initial";
}

function getVideoImage(path, secs, callback) {
    var me = this, video = document.createElement('video');
    video.onloadedmetadata = function() {
      if ('function' === typeof secs) {
        secs = secs(this.duration);
      }
      this.currentTime = Math.min(Math.max(0, (secs < 0 ? this.duration : 0) + secs), this.duration);
    };
    video.onseeked = function(e) {
      var canvas = document.createElement('canvas');
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      var img = new Image();
      img.src = canvas.toDataURL();
      callback.call(me, img, this.currentTime, e);
    };
    video.onerror = function(e) {
      callback.call(me, undefined, undefined, e);
    };
    video.src = path;
}

function resizeWidth(width, height) {
    if (width > height) {
        while (width > 300) {
            width -= 50;
        }
    } else {
        while (width > 150) {
            width -= 50;
        }
    }
    return width + "px";
}

function resizeHeight(height) {
    while (height > 200) {
        height -= 50;
    }
    return height + "px";
}

function preloadImage() {
    var id = document.getElementById('preview-image');
    if (id) {
        var height = id.naturalHeight;
        var width = id.naturalWidth;
        previewImageHeight = height;
        previewImageWidth = width;
        console.log("HEIGHT: " + height + " WIDTH : " + width)

        if (width > 300 && height > 200) {
            id.style.height = resizeHeight(height);
            id.style.width = resizeWidth(width, height);
        }
        textbox.style.minHeight = "4em";
        textbox.style.height = "4em";
        textbox.style.maxHeight = "4em";
        id.style.display = "initial";
    } else {
        setTimeout(preloadImage, 15);
    }
}

function choose_file(input) {
    var acceptable_types = ['jpg', 'png', 'mov', 'mp4']
    if (input.files && input.files[0] && acceptable_types.includes(input.files[0].name.split('.')[1])) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // previewImageSrc = e.target.result;
            if (input.files[0].name.split('.')[1] == 'mov' || input.files[0].name.split('.')[1] == 'mp4') {

                // if (input.files[0].name.split('.')[1] == 'mov') {
                //     $('#preview-video-mov').attr('src', e.target.result);
                // } else {
                //     $('#preview-video').attr('src', e.target.result);
                // }

                videoUrl = e.target.result;
                videoSelected = true;
                getVideoImage(e.target.result, 1, getVideoImageCallback)

            } else {
                $('#preview-image').attr('src', e.target.result);
            }

            postButton.style.backgroundColor = "#abecb6";
            postButton.style.color = "white";
            pencil.style.fill = "white";
            postClicked = false;
            mediaPostValid = true;
            text_box_max = 100;
            media_file = input.files[0]
        };

        document.querySelector('#preview-image').style.display = "none";
        setTimeout(preloadImage, 500)

        reader.readAsDataURL(input.files[0]);

    } else {
        // BUG HERE : Whenever there is already a media file in preview mode and the user selects the choose file button but doesn't select anythin, the file not supported message still appears.
        document.querySelector('#file-not-supported').style.display = "initial";
    }
}

function addTextPost(author, content, postID) {
    const postElement = document.createElement('div');
    const postsContainer = document.querySelector('.Posts');
    postElement.classList.add('Post');
    postElement.innerHTML = `
        <div class="text-post" id="${postID}" onclick="trackCurrentPost(this.id)" onmouseover="showShadow(this.id)" onmouseout="hideShadow(this.id)">
            <img src="imgs/avatar.jpg" alt="avatar" id="avatar">
            <label id="username">${author}</label>
            <label id="time-stamp">Less than a minute ago</label>
            <div class="text-content">
                <textarea id="text" cols="74" rows="5" readonly>${content}</textarea>
            </div>
            <label id="post-attribute-likes">0</label>
            <label id="post-subattribute-likes">Likes</label>
            <label id="post-attribute-comments">0</label>
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
    postsContainer.prepend(postElement);
}

function addMediaPost(author, postID) {
    const postElement = document.createElement('div');
    const postsContainer = document.querySelector('.Posts');
    postElement.classList.add('Post');
    postElement.innerHTML = `
        <div class="media-post" id="${postID}" onclick="trackCurrentPost(this.id)" onmouseover="showShadow(this.id)" onmouseout="hideShadow(this.id)">
            <img src="imgs/avatar.jpg" alt="avatar" id="avatar">
            <label id="username">${author}</label>
            <label id="time-stamp">Less than a minute ago</label>
            <div class="media-content">

            </div>

            <label id="post-attribute-likes">0</label>
            <label id="post-subattribute-likes">Likes</label>
            <label id="post-attribute-comments">0</label>
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
            <br>
            <div class="media-comments">
                <label id="comment-username-slot2"></label>
                <label id="comment-slot2"></label>
            </div>
        </div>
    `;
    postsContainer.prepend(postElement);

}

var banner = document.querySelector(".banner img");

banner.addEventListener('mouseover', e=> {
    banner.src = 'imgs/logo_hover.png';
})

banner.addEventListener('mouseout', e=> {
    banner.src = 'imgs/logo.png';
})

function showPostSettings() {
    id = currPost.name;
    postSettingsClicked = true;
    if (postOptionsListShowing) {
        // document.querySelector("#" + id + " .post-settings-list").style.opacity = "0";
        document.querySelector("#" + id + " .post-settings-list").style.display = "none";
        postOptionsListShowing = false;
        postSettingsClicked = false;
    } else {
        // document.querySelector("#" + id + " .post-settings-list").style.opacity = "1";
        document.querySelector("#" + id + " .post-settings-list").style.display = "initial";
        postOptionsListShowing = true;
        postSettingsClicked = true;
    }
}

document.addEventListener('click', function(event) {
    id = currPost.name;
    var postSettings = document.querySelector("#" + id + " #post-settings");
    var postSettingsList = document.querySelector("#" + id + " .post-settings-list");
    if (postSettings) { var isClickInside = postSettings.contains(event.target); }
    if (postSettingsList) { var isPostSettingsClickedInside = postSettingsList.contains(event.target); }

    if (isPostSettingsClickedInside) {
        // do nothing
    } else {

        if (isClickInside) {
            if (postSettingsClicked) {
                postSettingsClicked = false;
            } else {
                postSettingsClicked = true;
            }
        } else {
            // postSettingsList.style.opacity = "0";
            if (postSettingsList) { postSettingsList.style.display = "none"; }
            postOptionsListShowing = false;
            postSettingsClicked = false;
        }
    }
});

document.addEventListener('click', function(event) {
    id = currPost.name;
    var postSettingsList = document.querySelector("#" + id + " .post-settings-list");
    if (postSettingsList) { var isClickInside = postSettingsList.contains(event.target); }

    if (postSettingsClicked) {
        if (isClickInside) {
            document.querySelector("body").style.overflow = "hidden";
            document.querySelector(".treeTop-navbar").style.zIndex = "0";
            document.querySelector("#profile-module").style.zIndex = "0";
            concealPostModuleMessage.style.display = "initial";
            concealPostModuleMessage.style.marginTop = screenTop - 50 + "px";
            deletingPost = true;
        } else {
            // do nothing
        }
    }
})

document.querySelector('#preview-image').addEventListener('mouseover', e => {
    var removeImage = document.getElementById("remove-image")
    removeImage.style.opacity = "1";
})

document.querySelector('#preview-image').addEventListener('mouseout', e => {
    var removeImage = document.getElementById("remove-image")
    removeImage.style.opacity = "0";
})

document.getElementById("remove-image").addEventListener('mouseover', e => {
    var removeImage = document.getElementById("remove-image")
    if (mediaPostValid) {
        removeImage.style.opacity = "1";
        removeImage.style.cursor = "pointer";
    } else {
        removeImage.style.cursor = "text";
    }
})

document.getElementById("remove-image").addEventListener('mouseout', e => {
    var removeImage = document.getElementById("remove-image")
    removeImage.style.cursor = "initial";
})

document.getElementById("remove-image").addEventListener('click', e => {
    document.querySelector('#video-label').style.display = "none";
    if (mediaPostValid) {
        if (document.querySelector('.preview-media-post').style.marginLeft === "7.5%") {
            closePreviewMediaPost()
            var removeImage = document.getElementById("remove-image")
            removeImage.style.opacity = "0";
            document.querySelector('#file-selection').value = ''
            document.querySelector('#preview-image').style.display = 'none'
            textbox.style.minHeight = "8em";
            textbox.style.height = "8em";
            textbox.style.maxHeight = "16em";
            mediaPostValid = false;
            postButton.style.backgroundColor = "white";
            postButton.style.color = "#abecb6";
            pencil.style.fill = "#abecb6";
            postClicked = true;
            textPostValid = false;
            text_box_max = 420;
        } else {
            var removeImage = document.getElementById("remove-image")
            removeImage.style.opacity = "0";
            document.querySelector('#file-selection').value = ''
            document.querySelector('#preview-image').style.display = 'none'
            textbox.style.minHeight = "8em";
            textbox.style.height = "8em";
            textbox.style.maxHeight = "16em";
            mediaPostValid = false;
            postButton.style.backgroundColor = "white";
            postButton.style.color = "#abecb6";
            pencil.style.fill = "#abecb6";
            postClicked = true;
            textPostValid = false;
            text_box_max = 420;
        }
        
        videoUrl = null;
        videoSelected = false;

    } else {
        // do nothing
    }
})

function resizeMediaContentWidth(width, height) {
    if (width > height) {
        while (width > 300) {
            width -= 50;
        }
    } else {
        while (width > 150) {
            width -= 50;
        }
    }
    return width + "px";
}

function resizeMediaContentHeight(height) {
    while (height > 200) {
        height -= 50;
    }
    return height + "px";
}

$(document).ready(function() {
    $("#preview-image").click(function(event) {
        if (commentSection.style.display === "initial") {
            commentSection.style.display = "none";
            reopenCommentSection = true;
        }
        event.preventDefault();
        savePosition = screenTop;

        if (videoSelected) {
            $('#preview-video-src').attr('src', videoUrl);
            document.querySelector(".videoInsert").style.display = "initial";

        } else {
            var previewMediaContent = document.querySelector(".preview-media-content");
            var contentURL = "url(" + document.getElementById("preview-image").getAttribute("src") + ")";
            previewMediaContent.style.backgroundImage = contentURL;
            if (previewImageWidth <= previewImageHeight) {
                previewMediaContent.style.backgroundPositionY = "-" + (previewImageHeight/(previewImageWidth/720) - .24)/3 + "px";
                previewMediaContent.style.backgroundSize = previewImageWidth/((previewImageWidth/720) - .24) + "px " + previewImageHeight/((previewImageWidth/720) - .24) + "px";
            } else if (previewImageWidth == 1920 && previewImageHeight == 1080) {
                previewMediaContent.style.backgroundPosition = "0px 0px";
                previewMediaContent.style.backgroundSize = previewImageWidth/((previewImageHeight/430)) + "px " + previewImageHeight/((previewImageHeight/430)) + "px";
            } else if (previewImageWidth < 1920 && previewImageHeight > 1080) {
                previewMediaContent.style.backgroundPosition = "0px 0px";
                previewMediaContent.style.backgroundSize = previewImageWidth/((previewImageHeight/610)) + "px " + previewImageHeight/((previewImageHeight/610)) + "px";
            } else {
                previewMediaContent.style.backgroundPosition = "0px 0px";
                previewMediaContent.style.backgroundSize = previewImageWidth/((previewImageHeight/570)) + "px " + previewImageHeight/((previewImageHeight/570)) + "px";
            }

            backgroundPosition = previewMediaContent.style.backgroundPosition;
            backgroundSize = previewMediaContent.style.backgroundSize;
            $('.preview-media-content').backgroundDraggable({ 
                done: function() {
                    backgroundPosition = $('.preview-media-content').css('background-position');
                    console.log(backgroundPosition);
                }, 
                axis: 'y',
                bound: true
            });
        }
        $("html, body").animate({ scrollTop: 200 }, "fast");
        count++;
        var postsContainer = document.querySelector('.Posts').childNodes;
        var previewMediaPost = document.querySelector('.preview-media-post');
        // console.log(postsContainer)
        postsContainer[0].style.marginTop = "60%";
        setTimeout(function() { previewMediaPost.style.marginLeft = "7.5%"; }, 200)
        previewMediaPost.style.top = "40%";
        previewMediaPostOpen = true;

        return false;
    });
});

document.getElementById("preview-media-save").addEventListener('click', e => {
    closePreviewMediaPost()
})

function closePreviewMediaPost() {
    document.querySelector(".videoInsert").style.display = "none";
    var previewMediaPost = document.querySelector('.preview-media-post');
    var postsContainer = document.querySelector('.Posts').childNodes;
    previewMediaPost.style.marginLeft = "150%";
    document.querySelector('body').style.overflowX = "hidden";
    previewMediaPostOpen = false;
    setTimeout(function() { previewMediaPost.style.marginTop = "150px"; }, 300)
    setTimeout(function() { postsContainer[0].style.marginTop = "150px"; }, 300)
    setTimeout(function() { 
        $("html, body").animate({ scrollTop: savePosition }, "fast");
        if (reopenCommentSection) {
            commentSection.style.display = "initial";
            reopenCommentSection = false;
        }
    }, 360)
}

var previewMediaContent = document.querySelector('.preview-media-content')

previewMediaContent.addEventListener('mousedown', e => {
    if (!videoSelected) { previewMediaContent.style.cursor = "all-scroll"; }
})

previewMediaContent.addEventListener('mouseup', e => {
    if (!videoSelected) { previewMediaContent.style.cursor = "grab"; }
})
