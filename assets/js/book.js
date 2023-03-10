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
    if(t.length>0){
    while(t.length>0){
        if(t[0]==='home'){s=s+'index';}
        else{
              s=s+t[0];
        }
        t.shift();
    }
    }
    if(s===window.location.pathname.split('/')[1].split('.')[0].toLowerCase()){
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

    var link=window.location.href;
    var obj_link=link.substring(link.length-20,link.length);

    Object.entries(object).map((e)=>{
        let img=e[1].image
        let book_year=e[1].year
        let book_name=e[1].name
        let a_name=e[1].authorName
        let desc=e[1].description
      
        if(e[0]==obj_link){
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
  
let comment__input=document.querySelector('.comment__form input')
let comment__button=document.querySelector('.comment__form button')

comment__button.addEventListener('click',(e)=>{
    let comments={
        name:"anonim",
        hour:new Date().getHours(),
        minute:new Date().getMinutes(),
        comment:comment__input.value
    }
    if(localStorage.getItem('join')){  
        let key_push=push(ref(db,'/library/comment')).key;
        comments.name=JSON.parse(localStorage.getItem('join'))?.name;
        set(ref(db,`/library/comment/${key_push}`),comments)
    }
    else{
        let key_push=push(ref(db,'/library/comment')).key;
        set(ref(db,`/library/comment/${key_push}`),comments)
    }
    comment__input.value='';
    alert('success')
e.preventDefault();
})
let comment_div=document.querySelector('.comment_d');
const getComment=async()=>{
    const object=await get(ref(db,`/library/comment`));
    const obj=await object.val()
    comment_div.innerHTML=``
    Object.entries(obj).slice(-5).map(objj=>{
        let comment__item=document.createElement('div');
        comment__item.classList.add('comment__item');
        let comment__title=document.createElement('div');
        comment__title.classList.add('comment__title');
        let h3=document.createElement('h3');
        h3.innerHTML=objj[1]?.name;
        let p_date=document.createElement('p');
        p_date.innerHTML=`${objj[1]?.hour}:${objj[1]?.minute}`
        comment__title.append(h3,p_date);
        let comment__description=document.createElement('div');
        comment__description.classList.add('comment__description');
        let desc_p=document.createElement('p');
        desc_p.innerHTML=objj[1]?.comment;
        comment__description.append(desc_p);
        comment__item.append(comment__title,comment__description)
        comment_div.prepend(comment__item)
    })
}

getComment();