'use strict';

/*****************************************************
 * project:     Centripetal Photography
 * author:      Sarah Rosanna Busch
 * description: Displays Chris Perrier's photography
******************************************************/

var main = (function() {
    var that = {}; //public objects
    var elem = {}; //dom references
    var vars = {
        curPage: 'home',
        clicked: '', //img.id of _clicked thumbnail
        firstImgIdx: 0, //first to display in gallery
        picsPerPage: 6, //num photos to display in gallery
        zindex: 20
    }; //static variables

    // brief: called from <body>'s onload event
    that.init = function() {
        console.log('initializing...')

        elem.body = SB.html.getElem('body');
        elem.menuIcon = SB.html.getElem('#menuIcon');
        elem.menu = SB.html.getElem('nav');
        createMenu();
        elem.menuBtns = SB.html.getElems('button', elem.menu);
        elem.overlay = SB.html.getElem('#overlay');

        elem.homeView = SB.html.getElem('#homeView');
        elem.galleryView = SB.html.getElem('#galleryView');
        elem.photoView = SB.html.getElem('#photoView');
        
        elem.galleryPhotos = SB.html.getElem('#galleryPhotos');
        elem.left = SB.html.getElem('#left');
        elem.right = SB.html.getElem('#right');

        createHomePage();
        that.nav("home");
    }

    // brief: menuIcon click event handler
    // param: <bool> true to open, false to close
    that.openMenu = function(open) {
        console.log('showing menu: ' + open);
        var displayType = open ? 'none' : 'block';
        elem.menuIcon.style.display = displayType;
        displayType = open ? 'block' : 'none';
        elem.menu.style.display = displayType;
        elem.overlay.style.display = displayType;
    }

    // brief: menu button click event handler
    // param: '' = id of <main> to display
    that.nav = function(page) { 
        console.log('loading ' + page + ' view');
        that.openMenu(false);
        that.showFull(false);
        vars.zindex = 20;
        vars.curPage = page;
        switch(page) {
            case 'home':
                elem.homeView.style.display = "block";
                elem.galleryView.style.display = "none";
                break;
            default:
                elem.homeView.style.display = "none";
                elem.galleryView.style.display = "block";
                loadGallery(page);
                break;
        }
    }    

    // brief: populate menu
    function createMenu() {
        console.log('creating menu')
        for(var key in PHOTOS) {
            var btn = SB.html.spawn(elem.menu, 'button', key);
            btn.innerText = key;
            btn.onclick = function() {
                that.nav(this.id);
            }
        }
    }

    function createHomePage() {
        console.log('creating home page');
        for(var key in PHOTOS) {
            var fig = SB.html.spawn(elem.homeView, 'figure');
            fig.id = key;
            fig.className = 'cat';
            fig.onclick = function() {
                that.nav(this.id);
            }
            var img = SB.html.spawn(fig, 'img');
            img.src = 'photos/' + key + '/' + PHOTOS[key][0]; //use first in list for cover
            var caption = SB.html.spawn(fig, 'figcaption');
            caption.className = 'cat';
            caption.innerText = key;
        }
    }

    /* brief: loads "thumbnail" images into <main> when in gallery mode*/
    function loadGallery()
    {
        console.log('loading ' + vars.curPage + ' gallery');
        SB.html.empty(elem.galleryPhotos);

        //display requested set of images
        var i = vars.firstImgIdx;
        var len = PHOTOS[vars.curPage].length;
        for(var i = 0; i < len; i++) {
            var fig = SB.html.spawn(elem.galleryPhotos, 'figure');
            fig.className = 'gallery';

            fig.style.transform = "rotate(" + getRandomNumber() + "deg)";
            fig.onmouseover = function() {
                this.style.transform = "rotate(0deg)";
                this.style.zIndex = vars.zindex;
                vars.zindex++;
            }
            fig.onmouseout = function() {
                this.style.transform = "rotate(" + getRandomNumber() + "deg)";
            }

            var img = SB.html.spawn(fig, 'img', i);
            img.src = 'photos/' + vars.curPage + '/' + PHOTOS[vars.curPage][i];
            img.onclick = function() {
                vars.clicked = this.id;
                that.showFull(true);
            }
        }
    }

    function getRandomNumber(){
        var posNeg = (Math.random() > 0.5) ? 1 : -1;
        var x = Math.random() * 75 * posNeg;
        return x;
    }

    /* brief: "thumbnail" onclick event; loads the pic selected in fullscreen mode
    * params: show - boolean to toggle fullscreen mode                         */
    that.showFull = function(show) {
        console.log('showing fullscreen photo ' + show);
        if(show) {
            elem.photoView.style.display = 'block';
            var curPicIdx = parseInt(vars.clicked);
            var fullImage = document.getElementById('fullPhoto');
            fullImage.src = 'photos/' + vars.curPage + '/' +PHOTOS[vars.curPage][curPicIdx];
            elem.photoView.style.display = "block";
            elem.body.style.overflowY = 'hidden';
        } else {
            elem.photoView.style.display = 'none';
            elem.body.style.overflowY = 'auto';
        }
    }

    return that;
}());
