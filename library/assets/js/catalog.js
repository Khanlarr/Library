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
  spaceBetween: 5,

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    912: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 10,
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

onValue(ref(db, '/library'), async (snap) => {
  let object = (await snap.val()) || {};
  console.log(object);
});

const bestseller = document.querySelector('.bestseller');
const newRelease = document.querySelector('.new_release');

onValue(ref(db, '/library/book'), async (snap) => {
  let object = (await snap.val()) || {};
  console.log(object);

  let arr = Object.entries(object);
  let shortArr = arr.slice(0, 9);
  shortArr.map(function (e) {
    console.log(e[1].name);
    let name = e[1].name;

    show(e[1], bestseller);
  });

  arr.map(function (e) {
    let year = e[1].year;
    if (year >= 2021) {
      show(e[1], newRelease);
    }
  });
  console.log(arr);
});

console.log(bestsellerBooks);

function show(book, assignTo) {
  let swiper = document.createElement('div');
  swiper.setAttribute('class', 'swiper-slide');

  let div = document.createElement('div');
  div.setAttribute('class', 'item__container');

  let img = document.createElement('img');
  img.setAttribute('src', book.image);
  img.setAttribute('class', 'item__img');

  let info = document.createElement('div');
  info.setAttribute('class', 'item__info');

  let name = document.createElement('div');
  name.setAttribute('class', 'item__name');
  if (book.name.length > 20) {
    let short = book.name.slice(0, 20) + '...';
    name.textContent = short;
  } else {
    name.textContent = book.name;
  }

  let author = document.createElement('div');
  author.setAttribute('class', 'author__name');
  author.textContent = book.authorName;

  let btn = document.createElement('div');
  btn.setAttribute('class', 'item__btn');
  btn.textContent = 'READ MORE';

  info.prepend(name, author, btn);
  div.prepend(img, info);
  swiper.prepend(div);
  assignTo.prepend(swiper);
}
