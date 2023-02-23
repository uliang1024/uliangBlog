const header = document.querySelector('#header')
const toTop = document.querySelector('.to-top')
const scrollAnimationTop = document.querySelectorAll('.scroll-animation-top');
const scrollAnimationBottom = document.querySelectorAll('.scroll-animation-bottom');
const scrollAnimationLeft = document.querySelectorAll('.scroll-animation-left');
const scrollAnimationRight = document.querySelectorAll('.scroll-animation-right');
const filterBtn = document.querySelector('#filter-btn');
//頁面動畫

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.toggle('show', entry.isIntersecting);
        }
    })
})

scrollAnimationTop.forEach((el) => observer.observe(el));
scrollAnimationBottom.forEach((el) => observer.observe(el));
scrollAnimationLeft.forEach((el) => observer.observe(el));
scrollAnimationRight.forEach((el) => observer.observe(el));

//本地json檔讀取

var requestURL = './post.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var superHeroes = request.response;
    showHeroes(superHeroes);
}

function showHeroes(jsonObj) {
    var heroes = jsonObj['post'];

    var images = document.querySelector('#images');

    for (i = 0; i < heroes.length; i++) {
        var div1 = document.createElement('div');
        div1.classList.add('col-lg-3', 'col-6', 'p-1', 'filter-img');
        div1.setAttribute('data-name', heroes[i].Type);

        var div2 = document.createElement('div');
        div2.classList.add('ratio', 'ratio-1x1');
        div2.setAttribute('data-bs-toggle', 'modal');
        div2.setAttribute('data-bs-target', '#exampleModal');

        div1.appendChild(div2);

        var img = document.createElement('img');
        img.setAttribute('src', heroes[i].Url);
        img.classList.add('img-fluid', 'rounded', 'mx-auto', 'd-block', 'h-100');
        img.setAttribute('alt', heroes[i].Title);

        div2.appendChild(img);

        images.appendChild(div1);
    }
}

//照片篩選

window.onload = () => {

    const filterImg = document.querySelectorAll('.filter-img');

    filterBtn.onclick = (selectedItem) => {
        if (selectedItem.target.classList.contains('btn-check')) {
            let filterName = selectedItem.target.getAttribute('data-name');
            filterImg.forEach((image) => {
                let filterImg = image.getAttribute('data-name');
                if ((filterImg == filterName) || filterName == 'all') {
                    image.classList.remove('hide');
                    image.classList.add('show');
                } else {
                    image.classList.add('hide');
                    image.classList.remove('show');
                }
            })
        }
    }
}

//navbar 開關

$('#navbar').on('show.bs.collapse', function () {
    header.classList.add("show");
})

$('#navbar').on('hide.bs.collapse', function () {
    header.classList.remove("show");
})

//顯示 回到最上層

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
        header.classList.add("sticky");
        header.classList.remove("p-2");
        if (window.pageYOffset > 100) {
            toTop.classList.add("active");
        }
    } else {
        header.classList.remove("sticky");
        header.classList.add("p-2");
        toTop.classList.remove("active");
    }
})

// -----------時間流程------------

$.fn.timeline = function () {
    var selectors = {
        id: this,
        item: this.find(".timeline-item"),
        activeClass: "timeline-item--active",
        img: ".timeline__img"
    };
    selectors.item.eq(0).addClass(selectors.activeClass);
    selectors.id.css(
        "background-image",
        "url(" + selectors.item.first().find(selectors.img).attr("src") + ")"
    );
    var itemLength = selectors.item.length;
    $(window).scroll(function () {
        var max, min;
        var pos = $(this).scrollTop();
        selectors.item.each(function (i) {
            min = $(this).offset().top;
            max = $(this).height() + $(this).offset().top;
            if (i == itemLength - 2 && pos > min + $(this).height() / 2.5) {
                selectors.item.removeClass(selectors.activeClass);
                selectors.id.css(
                    "background-image",
                    "url(" + selectors.item.last().find(selectors.img).attr("src") + ")"
                );
                selectors.item.last().addClass(selectors.activeClass);
            } else if (pos <= max - 40 && pos >= min - 300) {
                selectors.id.css(
                    "background-image",
                    "url(" + $(this).find(selectors.img).attr("src") + ")"
                );
                selectors.item.removeClass(selectors.activeClass);
                $(this).addClass(selectors.activeClass);
            }
        });
    });
};

$("#timeline-1").timeline();

// -----------------------