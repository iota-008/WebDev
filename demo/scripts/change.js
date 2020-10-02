/* gobal document,window,localStorage  */

/* this is to change profile picture*/

var profileImage = document.querySelector('img');

profileImage.onclick = function () {

    var imageLink = profileImage.getAttribute('src');

    if (imageLink === 'images/groot.jpg') {

        profileImage.setAttribute('src', 'images/blackhole.jpg');

    }
    else if (imageLink == 'images/wings.jpg') {

        profileImage.setAttribute('src', 'images/groot.jpg');

    }
    else {

        profileImage.setAttribute('src', 'images/wings.jpg');

    }


};


/* this is to change profile name */

var btn = document.querySelector('button');
var HeadingName = document.querySelector('h1');

function setUserName() {
    'use strict';
    var username = window.prompt('enter your name');
    localStorage.setItem('name',username.toUpperCase());
    HeadingName.textContent = username.toUpperCase();

}
if (!localStorage.getItem('name')) {
    'use strict';
    setUserName();
}
else {
    var storedname = localStorage.getItem('name');
    HeadingName.textContent = storedname;
}

btn.onclick = function () {
    'use strict';
    setUserName();
}

