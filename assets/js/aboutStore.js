import { db } from "./connection.js";
import {
  get,
  set,
  ref,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
let joinUs_Title = document.querySelector(".header__join_us p");
let mainCloseBtn = document.querySelector('.close_button')
let respoCloseBtn = document.querySelector('.close_button_repo')
function updateSize() {
    if(window.innerWidth > 991){
        mainCloseBtn.style.display = 'inline-block'
        respoCloseBtn.style.display = 'none'

    }
    else{
        respoCloseBtn.style.display = 'inline-block'
        mainCloseBtn.style.display = 'none'
    }
    if(!localStorage.getItem('join')){
        respoCloseBtn.style.display = 'none'
        mainCloseBtn.style.display = 'none'
    }

  }
if(joinUs_Title.innerHTML){
    joinUs_Title.innerHTML=JSON.parse(localStorage.getItem('join'))?.name || 'Join Us';
    if(localStorage.getItem('join')){
        updateSize()
        mainCloseBtn.addEventListener('click',()=>{
            document.querySelector('.modal').classList.toggle('active_modal')
            localStorage.removeItem('join')
            location.reload()
        })
        respoCloseBtn.addEventListener('click',()=>{
            document.querySelector('.modal').classList.toggle('active_modal')
            localStorage.removeItem('join')
            location.reload()
        })
    }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("active_modal")) {
    document.querySelector(".modal").classList.remove("active_modal");
  }
});
document.querySelector(".header__join_us").addEventListener("click", () => {
  if (!localStorage.getItem("join")) {
    document.querySelector(".modal").classList.toggle("active_modal");
  }
});

document
  .querySelector(".header__responsive_menu p")
  .addEventListener("click", () => {
    document.querySelector(".header__list").classList.add("active");
  });
document.querySelector(".header__list>div").addEventListener("click", () => {
  document.querySelector(".header__list").classList.remove("active");
});

document.querySelectorAll(".header__list ul li a").forEach((e) => {
  var t = e.innerHTML.toLowerCase().split(" ");
  var s = "";
  if (t.length > 0) {
    while (t.length > 0) {
      if (t[0] === "home") {
        s = s + "index";
      } else {
        s = s + t[0];
      }
      t.shift();
    }
  }
  console.log(window.location.pathname.split("/"));
  if (
    s === window.location.pathname.split("/")[2].split(".")[0].toLowerCase()
  ) {
    e.classList.add("active");
  }
});

const join_us_name = document.querySelector(".modal .join_us #name");
const join_us_email = document.querySelector(".modal .join_us #email");
const join_us_btn = document.querySelector(".modal .join_us .join_btn");

join_us_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!localStorage.getItem("join")) {
    let join = {
      name: join_us_name.value.trim(),
      email: join_us_email.value.trim(),
    };
    if (join.name !== "" && join.email !== "") {
      if (join.email.includes("@")) {
        var key = push(ref(db, "/library/joinUs")).key;
        set(ref(db, `/library/joinUs/${key}`), join);
        localStorage.setItem("join", JSON.stringify(join));
        document.querySelector(".modal").classList.remove("active_modal");
        joinUs_Title.innerHTML = join.name;
        join = {};
        alert("Success");
        location.reload()
      } else {
        alert("Zehmet olmasa melumatlari dogru daxil edin");
      }
    } else {
      alert("Zehmet olmasa melumatlari daxil edin");
    }
  }
});

const about_title = document.querySelector(".mid h1");
const about_description = document.querySelector(".mid #text");
const about_description_img = document.querySelector(".book img");

onValue(ref(db, "/library/about"), async (snap) => {
  var object = (await snap.val()) || {};
  about_title.innerHTML = object?.title || "About Store";
  about_description.innerHTML =
    object?.description ||
    `We work without holidays and weekends! Residents of Kiev can receive an order on the day of its registration. Customers from other cities of Ukraine can
    receive an order within 1-5 days, depending on the location of the settlement and the
    selected delivery method. Orders over UAH 1000 are delivered free of charge *. You can
    see the available methods, exact terms and cost of delivery during checkout
     in the order basket, after selecting the delivery city.`;
  about_description_img.src = object?.image || "./assets/img/image 1.png";
});

window.addEventListener('scroll',()=>{
  document.querySelector('.header').classList.toggle('active',window.scrollY>0);
})
updateSize()
window.addEventListener("resize", updateSize);

window.addEventListener('load',function(){
  document.querySelector('body').classList.add("loaded")  
});
