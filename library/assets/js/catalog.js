import { db } from './connection.js';
import {
  get,
  set,
  ref,
  onValue,
  push,
} from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js';
let joinUs_Title = document.querySelector('.header__join_us p');
if (joinUs_Title.innerHTML) {
  joinUs_Title.innerHTML =
    JSON.parse(localStorage.getItem('join'))?.name || 'Join Us';
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('active_modal')) {
    document.querySelector('.modal').classList.remove('active_modal');
  }
});
document.querySelector('.header__join_us').addEventListener('click', () => {
  if (!localStorage.getItem('join')) {
    document.querySelector('.modal').classList.toggle('active_modal');
  }
});

document
  .querySelector('.header__responsive_menu p')
  .addEventListener('click', () => {
    document.querySelector('.header__list').classList.add('active');
  });
document.querySelector('.header__list>div').addEventListener('click', () => {
  document.querySelector('.header__list').classList.remove('active');
});

document.querySelectorAll('.header__list ul li a').forEach((e) => {
  var t = e.innerHTML.toLowerCase().split(' ');
  var s = '';
  console.log(t);
  if (t.length > 0) {
    while (t.length > 0) {
      if (t[0] === 'home') {
        s = s + 'index';
      } else {
        s = s + t[0];
      }
      t.shift();
    }
  }
  if (
    s === window.location.pathname.split('/')[2].split('.')[0].toLowerCase()
  ) {
    e.classList.add('active');
  }
});

const join_us_name = document.querySelector('.modal .join_us #name');
const join_us_email = document.querySelector('.modal .join_us #email');
const join_us_btn = document.querySelector('.modal .join_us .join_btn');

join_us_btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!localStorage.getItem('join')) {
    let join = {
      name: join_us_name.value.trim(),
      email: join_us_email.value.trim(),
    };
    if (join.name !== '' && join.email !== '') {
      if (join.email.includes('@')) {
        var key = push(ref(db, '/library/joinUs')).key;
        set(ref(db, `/library/joinUs/${key}`), join);
        localStorage.setItem('join', JSON.stringify(join));
        document.querySelector('.modal').classList.remove('active_modal');
        joinUs_Title.innerHTML = join.name;
        join = {};
        alert('Success');
      } else {
        alert('Zehmet olmasa melumatlari dogru daxil edin');
      }
    } else {
      alert('Zehmet olmasa melumatlari daxil edin');
    }
  }
});

/*  <!-- Initialize Swiper --> */

const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    912: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

/* onValue(ref(db, '/library/catalog/categories'), async (snap) => {
  var object = (await snap.val()) || {};
  catalog__container.innerHTML = '';
  object?.map((obj) => {
    let div = document.createElement('div');
    div.classList.add('catalog__item');
    let a = document.createElement('a');
    a.innerHTML = obj;
    div.append(a);
    catalog__container.append(div);
  });
}); */

onValue(ref(db, '/library'), async (snap) => {
  var object = (await snap.val()) || {};
  console.log(object);
});

let bestsellerBooks = [];

onValue(ref(db, '/library/book'), async (snap) => {
  var object = (await snap.val()) || {};
  console.log(object);
  console.log(Object.entries(object));
  Object.entries(object).map((book) => {
    console.log(book[1]);
    bestsellerBooks.push(book[1]);
    console.log(bestsellerBooks);
    showBestseller();
  });
});

console.log(bestsellerBooks);

const bestseller = document.querySelector('.bestseller');

function showBestseller() {
  bestsellerBooks.map((book) => {
    console.log(book);
    let div = $('<div></div>').attr('class', 'item__container');
    let img = $('<img></img>')
      .attr('class', 'item__img')
      .attr('src', book.image);
    let info = $('<div></div>').attr('class', 'item__info');
    let name = $('<div></div>').attr('class', 'item__name').text(book.name);
    let author = $('<div></div>').attr('class', 'author__name');
    let btn = $('<div></div>').attr('class', 'item__btn');
    info.append(name, author, btn);
    div.append(img, info);
    bestseller.append(div);
    console.log(div);
  });
}

/* <div class="item__container bestseller">
                <img
                  src="./assets/img/image 3.png"
                  alt="book image"
                  class="item__img bestseller"
                />
                <div class="item__img bestseller">
                  <div class="item__name bestseller">Order in chaos</div>
                  <div class="author__name bestseller">konstantin koptelov</div>
                  <div class="item__btn bestseller">READ MORE</div>
                </div> 
                 <div class="item__info bestseller">
                  <div class="item__name bestseller">Order in chaos</div>
                  <div class="author__name bestseller">konstantin koptelov</div>
                  <div class="item__btn bestseller">*/
