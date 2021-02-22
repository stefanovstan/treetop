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
const avatar = document.getElementById("avatar");
const textPostAvatar = document.querySelector(".text-post #avatar");
const distanceFromBanner = 150;
const imageIcon = document.getElementById("image-icon");
const pencil = document.getElementById("pencil");
const concealPostModuleMessage = document.querySelector(".conceal-post-module-message");
const concealPostModuleMessageYes = document.querySelector(".conceal-post-module-message #yes");
const concealPostModuleMessageNo = document.querySelector(".conceal-post-module-message #no");

var characterCount = document.getElementById("characters-left");

var screenHeight = null;
var screenTop = null;
var count = 50;
var postClicked = false;
var textPostValid = false;
var mediaPostValid = false;
var postModuleHome = true;

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
    var rect = mediaPost.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);

    var text = textPost.getBoundingClientRect();
    console.log(text.top, text.right, text.bottom, text.left);
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

    setTimeout(function() {
        if (currPost.id === null) {
            //do nothing
        }

        else if (screenTop === null) {
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
    if (commentSection.style.display === "initial") {
        document.getElementById(id).style.boxShadow = " 0 0 25px #678f6d";
    }
    else {
        document.getElementById(id).style.boxShadow = "initial";
    }
}

postButton.addEventListener('click', e=> {
    postModule.style.left = "1%";
    postClicked = true;
    if (textPostValid || mediaPostValid) {

        if (textbox.value.length < 1) {
            postButton.style.backgroundColor = "white";
            postButton.style.color = "#abecb6";
            pencil.style.fill = "#abecb6";
        } else if (textbox.value.length >= 1) {
            postButton.style.backgroundColor = "#abecb6";
            postButton.style.color = "white";
            pencil.style.fill = "white";
        }
    } else {
        // do nothing
    }
});

document.addEventListener('click', function(event) {
    var profileModule = document.getElementById("profile-module");
    var profile = document.getElementById("logged-in-user");
    var isClickInside = profile.contains(event.target);

    if (isClickInside) {
        profileModule.style.opacity = "100%";
    } else {
        profileModule.style.opacity = "0%";
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
    if (textbox.value.length >= 370 && textbox.value.length <= 400) {
        characterCount.style.display = "initial";
        characterCount.style.color = "#ffe629";
        var updatedCount = `
            <label>${420-textbox.value.length}</label>
        `;
        characterCount.innerHTML = updatedCount;
        textPostValid = true;
    }
    if (textbox.value.length > 400) {
        postClicked = false;
        characterCount.style.display = "initial";
        characterCount.style.color = "#f72d2d";
        var updatedCount = `
            <label>${420-textbox.value.length}</label>
        `;
        characterCount.innerHTML = updatedCount;
        textPostValid = true;
    } 
    if (textbox.value.length > 420) {
        postButton.style.backgroundColor = "white";
        postButton.style.color = "#abecb6";
        pencil.style.fill = "#abecb6";
        postClicked = true;
        textPostValid = false;
    }
    if (textbox.value.length < 370) {
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

concealPostModuleMessageYes.addEventListener('click', e=>{
    textbox.value = ""
    document.querySelector("body").style.overflow = "initial";
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
})

concealPostModuleMessageNo.addEventListener('click', e=>{
    document.querySelector("body").style.overflow = "initial";
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
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview-image')
                .attr('src', e.target.result);
            postButton.style.backgroundColor = "#abecb6";
            postButton.style.color = "white";
            pencil.style.fill = "white";
            postClicked = false;
            mediaPostValid = true;
        };

        document.querySelector('#preview-image').style.display = "none";
        setTimeout(preloadImage, 500)

        reader.readAsDataURL(input.files[0]);

    }
}

var banner = document.querySelector(".banner img");

banner.addEventListener('mouseover', e=> {
    banner.src = 'imgs/logo_hover.png';
})

banner.addEventListener('mouseout', e=> {
    banner.src = 'imgs/logo.png';
})