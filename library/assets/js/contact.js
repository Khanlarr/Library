import { db } from "./connection.js";
import { get,set,ref,onValue,push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const full_name=document.querySelector(".contact___us_form #full_name");
const email=document.querySelector(".contact___us_form #email");
const address=document.querySelector(".contact___us_form #address");
const phone=document.querySelector(".contact___us_form #phone");
const btn=document.querySelector(".contact___us_form button");

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let contact={
        name:full_name.value.trim(),
        email:email.value.trim(),
        address:address.value.trim(),
        phone_number:phone.value.trim()
    }
    if(contact.name!=='' && contact.email!=="" && contact.address!=="" && contact.phone_number!==""){
    if(contact.email.includes('@')){
        var key = push(ref(db,'/library/contact')).key;
        set(ref(db,`/library/contact/${key}`),contact)
        contact={};
        full_name.value=''
        email.value=''
        address.value=''
        phone.value=''
        alert("Success")
    }
    else{
        alert("Zehmet olmasa melumatlari dogru daxil edin")
    }
    }else{
        alert("Zehmet olmasa melumatlari daxil edin")
    }
})


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

window.addEventListener('scroll',()=>{
    document.querySelector('.header').classList.toggle('active',window.scrollY>0);
})
updateSize()
window.addEventListener("resize", updateSize);

window.addEventListener('load',function(){
    document.querySelector('body').classList.add("loaded")  
  });
  