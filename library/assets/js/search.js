import { db } from "./connection.js";
import { get,set,ref,onValue,push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
let joinUs_Title=document.querySelector('.header__join_us p')
if(joinUs_Title.innerHTML){joinUs_Title.innerHTML=JSON.parse(localStorage.getItem('join'))?.name || 'Join Us';}

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
    }
    else{
        alert("Zehmet olmasa melumatlari dogru daxil edin")
    }
    }else{
        alert("Zehmet olmasa melumatlari daxil edin")
    }
}
})
const showValues=(string,object)=>{
    let swiper =document.querySelector('.swiper-wrapper')
    swiper.innerHTML = "";
    Object.entries(object)?.forEach(item=>{
        if(item[1].name.toLowerCase().includes(string.toLowerCase())){
            let slide = document.createElement('div')
        slide.classList = 'swiper-slide'
        swiper.append(slide)
        let leftSlide = document.createElement('div')
        leftSlide.classList = 'left'
        slide.append(leftSlide)
        let imgSlide = document.createElement('img')
        imgSlide.src = item[1].image
        leftSlide.append(imgSlide)
        let rightSlide = document.createElement('div')
        rightSlide.classList = 'right'
        slide.append(rightSlide)
        let title = document.createElement('h3')
        title.classList = 'title'
        title.innerHTML = item[1].name
        rightSlide.append(title)
        let author = document.createElement('p')
        author.classList = 'author'
        author.innerHTML = item[1].authorName
        rightSlide.append(author)
        let info = document.createElement('p')
        info.classList = 'info'
        info.innerHTML = item[1].description
        rightSlide.append(info)
        }
        
    })
}
document.querySelector('.search_input').addEventListener('input',(e)=>{
    onValue(ref(db, "/library/book"), async (snap) => {
        var object = (await snap.val()) || {};
        showValues(e.target.value,object);
      });
})