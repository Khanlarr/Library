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

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('active_modal')) {
        document.querySelector('.modal').classList.remove('active_modal')
    }
})
document.querySelector('.header__join_us').addEventListener('click', () => {
    document.querySelector('.modal').classList.toggle('active_modal')
})


document.querySelector('.header__responsive_menu p').addEventListener('click',()=>{
    document.querySelector('.header__list').classList.add('active')
})
document.querySelector('.header__list>div').addEventListener('click',()=>{
    document.querySelector('.header__list').classList.remove('active')
})