;(function(factory){
    if (typeof define === 'function') {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        window.carousel = factory();
    }
})(function(){
    var loopEvent = 1;
    function Carousel($dom) {
        if (!$dom) {
            return false;
        } else {
            this.dom = $dom;
            this.w = $dom.offsetWidth;
            this.h = $dom.offsetHeight;
        }
        this.current = null;
        this.index = 0;
        this.len = 0;
        this.list = [];
        this.canMove = true;
        this.config = {
            interval: 2000,
            rate: 300,
            auto: true,
            numFixed: true
        };
        this.y = 0;
        this.touchStart = undefined;
        this.touchEnd = undefined;
        this.customStyle = '';
    };

    Carousel.prototype.init = function($list, $config) {
        if ($config && Object.prototype.toString.call($config) === '[object Object]') {
            for (let item in $config) {
                this.config[item] = $config[item];
            };
        };
        if ($list && Object.prototype.toString.call($list) === '[object Array]') {
            let arr = $list.concat();
            this.list = arr;
            this.len = arr.length;
            this.createDom();
        };
    };

    Carousel.prototype.createDom = function() {
        let arr = this.list,
            len = this.len,
            nav = document.createElement('nav'),
            ul = document.createElement('ul'),
            $dom = this.dom;
        for (let i = 0; i<len; i++) {
            let navItem = document.createElement('i'),
                li = document.createElement('li'),
                img = document.createElement('img');
            navItem.setAttribute('href', 'javascript:;');
            navItem.className = 'c-nav-item';
            navItem.setAttribute('data-index', i);
            li.className = 'c-item';
            img.setAttribute('src', arr[i]);
            li.appendChild(img);
            ul.appendChild(li);
            nav.appendChild(navItem);
        };
        nav.className = 'c-nav';
        ul.className = 'c-list';
        $dom.innerHTML = '';
        $dom.appendChild(ul);
        $dom.appendChild(nav);
        this.loop();
        this.touch();
    };

    Carousel.prototype.loop = function(prev) {
        let self = this,
            interval = this.config.interval,
            len = this.len,
            ul = document.getElementsByClassName('c-list')[0];
        self.animate(null, prev);
        loopEvent = setInterval(function() {
            if (!self.canMove) {
                return false;
            }
            self.index++;
            if (self.index >= len) {
                self.index = 0;
            };
            self.animate();
        }, interval);
    };

    Carousel.prototype.animate = function(touch, prev) {
        let self = this,
            len = self.len,
            rate = self.config.rate,
            $dom = document.getElementsByClassName('c-item'),
            index = self.index,
            w = self.w,
            t = touch || 0,
            prevRate = prev? 0 : rate,
            nextRate = prev? rate : 0;
        self.setNavActive(index);
        if (t !== 0) {
            rate = 0;
        };
        /**
         * 前一个图片
         */
        if ($dom[index-1] === undefined) {
            $dom[len-1].style.cssText = self.getCssText(-w + t, (len-1)*w, prevRate);
        } else {
            $dom[index-1].style.cssText = self.getCssText(-w + t, (index-1)*w, prevRate);
        };

        /**
         * 当前图片
         */
        $dom[index].style.cssText = self.getCssText(t, index*w, rate);

        /**
         * 后一个图片
         */
        if ($dom[index+1] === undefined) {
            $dom[0].style.cssText = self.getCssText(w + t, 0, nextRate);
        } else {
            $dom[index+1].style.cssText = self.getCssText(w + t, (index+1)*w, nextRate);
        };
    };

    Carousel.prototype.touch = function() {
        let self = this,
            $dom = document.querySelector('.c-list'),
            len = self.len,
            navItem = document.querySelectorAll('.c-nav-item'),
            navLen = navItem.length;
        $dom.addEventListener('touchstart', function(e) {
            clearInterval(loopEvent);
            self.canMove = false;
            self.touchStart = e.touches[0].clientX;
            self.touchEnd = e.touches[0].clientX;
            e.preventDefault();
        }, false);
        $dom.addEventListener('touchmove', function(e) {
            self.touchEnd = e.touches[0].clientX;
            let distance = self.touchEnd - self.touchStart;
            if (distance < 0) {
                self.animate(distance);
            } else if (distance > 0) {
                self.animate(distance, true);
            };
            e.preventDefault();
        }, false);
        $dom.addEventListener('touchend', function(e) {
            let distance = self.touchEnd - self.touchStart;
            self.canMove = true;
            if (distance < 0) {
                self.index += 1;
                if (self.index >= len) {
                    self.index = 0;
                };
                self.loop();
            } else if (distance > 0) {
                self.index -= 1;
                if (self.index <= -1) {
                    self.index = len-1;
                };
                self.loop('prev');
            } else {
                self.canMove = true;
                self.loop();
            }
            e.preventDefault();
        }, false);
        for (let l = 0;l<navLen;l++) {
            navItem[l].addEventListener('touchend', function(e) {
                clearInterval(loopEvent);
                self.canMove = false;
                let that = this,
                    prevIndex = self.index,
                    index = parseInt(that.getAttribute('data-index'));
                self.index = index;
                self.canMove = true;
                if (prevIndex > index) {
                    self.animate(null, true);
                } else {
                    self.animate();
                }
                self.loop();
                e.preventDefault();
            }, false);
        }
    }

    Carousel.prototype.getCssText = function(distance, left, rate) {
        this.y++;
        let l = left,
            r = rate,
            y = this.y + 1,
            d = distance,
            customStyle = `translate3d(${d}px, 0px, 0px)`,
            cssTextBase = `
            z-index: ${y};
            left: -${l}px;
            transition-duration: ${r}ms;
            transform: ${customStyle};
            -ms-transform: ${customStyle};
            -moz-transform: ${customStyle};
            -webkit-transform: ${customStyle};
            -o-transform: ${customStyle};`;
        return cssTextBase;
    }

    Carousel.prototype.setNavActive = function(index) {
        let nav = document.querySelectorAll('.c-nav-item'),
            navActive = document.querySelector('.c-nav-active');
        if (navActive) {
            navActive.classList.remove('c-nav-active');
        };
        nav[index].classList.add('c-nav-active');
    }
    return Carousel;
});


var $dom = document.querySelector('.carousel');
window.c = new carousel($dom);
var arr = [
    "../images/oreo.jpg",
    "../images/bacon.png",
    "../images/donut.png",
    "../images/waffle.png"
];
c.init(arr);