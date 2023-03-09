import { db } from "./connection.js";
import { get,set,ref,onValue,push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
let joinUs_Title=document.querySelector('.header__join_us p')
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
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('active_modal')) {
        document.querySelector('.modal').classList.remove('active_modal')
    }
})
document.querySelector('.header__join_us').addEventListener('click', () => {
    if(!localStorage.getItem('join')){
    document.querySelector('.modal').classList.toggle('active_modal')
    }
})

document.querySelector('.header__responsive_menu p').addEventListener('click',()=>{
    document.querySelector('.header__list').classList.add('active')
})
document.querySelector('.header__list>div').addEventListener('click',()=>{
    document.querySelector('.header__list').classList.remove('active')
})

document.querySelectorAll('.header__list ul li a').forEach((e)=>{
    var t=e.innerHTML.toLowerCase().split(' ')
    var s='';
    console.log(t);
    if(t.length>0){
    while(t.length>0){
        if(t[0]==='home'){s=s+'index';}
        else{
              s=s+t[0];
        }
        t.shift();
    }
    }
    if(s===window.location.pathname.split('/')[2].split('.')[0].toLowerCase()){
        e.classList.add('active')
    }
})

const join_us_name=document.querySelector('.modal .join_us #name');
const join_us_email=document.querySelector('.modal .join_us #email');
const join_us_btn=document.querySelector('.modal .join_us .join_btn');

join_us_btn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(!localStorage.getItem('join')){
    let join={
        name:join_us_name.value.trim(),
        email:join_us_email.value.trim()
    }
    if(join.name!=='' && join.email!==""){
    if(join.email.includes('@')){
        var key = push(ref(db,'/library/joinUs')).key;
        set(ref(db,`/library/joinUs/${key}`),join)
        localStorage.setItem('join',JSON.stringify(join))
        document.querySelector('.modal').classList.remove('active_modal')
        joinUs_Title.innerHTML=join.name
         join={};
        alert("Success")
        location.reload()
    }
    else{
        alert("Zehmet olmasa melumatlari dogru daxil edin")
    }
    }else{
        alert("Zehmet olmasa melumatlari daxil edin")
    }
}
})

// book js

var image=document.querySelector('#mid_img img')
var year=document.querySelector('#blue p')
var bookName=document.querySelector('.bookname')
var date=document.querySelector('.publishdate')
var authorName=document.querySelector('.authorname')
var description=document.querySelector('#kiev p')


onValue(ref(db, '/library/book'), async (snap) => {
    let object = (await snap.val()) || {};
    console.log(object);

    var link=window.location.href;
    var obj_link=link.substring(link.length-20,link.length);

    console.log(obj_link);

    Object.entries(object).map((e)=>{
        let img=e[1].image
        let book_year=e[1].year
        let book_name=e[1].name
        let a_name=e[1].authorName
        let desc=e[1].description
      
        if(e[0]==obj_link){
        console.log(e[1]);
        image.setAttribute('src',img);
        year.innerHTML=book_year;
        bookName.innerHTML=book_name;
        authorName.innerHTML=a_name;
        description.innerHTML=desc;   

      }
    })
});

window.addEventListener('scroll',()=>{
    document.querySelector('.header').classList.toggle('active',window.scrollY>0);
})

document.querySelector('#back_btn').addEventListener('click',()=>{history.go(-1);})
updateSize()
window.addEventListener("resize", updateSize);

window.addEventListener('load',function(){
    document.querySelector('body').classList.add("loaded")  
  });
  