import { db } from "./connection.js";
import { get,set,ref,onValue,push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
if(localStorage.getItem('user')){  // Girishi yoxlamaq
    const joinUsTableShow=(object)=>{
        let join_us_table=document.querySelector('.join_us_table table');
        object?.map(obj=>{
            let tr=document.createElement('tr');
            let td_id=document.createElement('td');
            let td_name=document.createElement('td');
            let td_email=document.createElement('td');
            td_id.innerHTML=obj.id;
            td_name.innerHTML=obj.name
            td_email.innerHTML=obj.email
            tr.append(td_id,td_name,td_email)
            join_us_table.append(tr)
        })
        }
        onValue(ref(db,'/library/joinUs'),async snap=>{
            var object = await snap.val() || {};
            joinUsTableShow(object);
        })
        
        const ContactTableShow=(object)=>{
            let contact=document.querySelector('.contact_us_table table');
        object?.map(obj=>{
            let tr=document.createElement('tr');
            let td_id=document.createElement('td');
            let td_name=document.createElement('td');
            let td_address=document.createElement('td');
            let td_email=document.createElement('td');
            let td_phoneNumber=document.createElement('td');
            td_id.innerHTML=obj.id;
            td_name.innerHTML=obj.name
            td_address.innerHTML=obj.address;
            td_email.innerHTML=obj.email
            td_phoneNumber.innerHTML=obj.phone_number
            tr.append(td_id,td_name,td_address,td_email,td_phoneNumber)
            contact.append(tr)
        })
        }
        
        onValue(ref(db,'/library/contact'),async snap=>{
            var object = await snap.val() || {};
            ContactTableShow(object);
          })
        
        const book_name=document.querySelector('.book_form_add .book_name input')
        const book_author_name=document.querySelector('.book_form_add .author_name input')
        const book_image_url=document.querySelector('.book_form_add .book_image_url input')
        const book_description=document.querySelector('.book_form_add .description textarea')
        const book_type=document.querySelector('.book_form_add .book_type input')
        const book_add=document.querySelector('.book_form_add .book_submit')
        
        book_add.addEventListener("click",(e)=>{
            let book={
                name:book_name.value,
                authorName:book_author_name.value,
                image:book_image_url.value,
                description:book_description.value,
                type:book_type.value,
            }
            if(book.name!=='' && book.authorName!=='' && book.image!=='' && book.description!=='' && book.type!==''){
            let key=push(ref(db,'/library/book')).key;
            set(ref(db,`/library/book/${key}`),book)
            book_name.value=''
            book_author_name.value=''
            book_image_url.value=''
            book_description.value=''
            book_type.value=''
            book={}
            alert("Success")
            }
            else{
                alert('Məlumatları daxil edin');
            }
            e.preventDefault();
        })
        
        const about_title=document.querySelector('.about_form_add .about_title input')
        const about_image_url=document.querySelector('.about_form_add .about_image_url input')
        const about_description=document.querySelector('.about_form_add .description textarea')
        const about_add=document.querySelector('.about_form_add .about_submit')
        
        about_add.addEventListener("click",(e)=>{
            let about={
                title:about_title.value,
                image:about_image_url.value,
                description:about_description.value,
            }
            if(about.title!=='' && about.image!=='' && about.description!==''){
            let key=push(ref(db,'/library/about')).key;
            set(ref(db,`/library/about/${key}`),about)
            about_title.value=''
            about_image_url.value=''
            about_description.value=''
            about={}
            alert("Success")
            }
            else{
                alert('Məlumatları daxil edin');
            }
            e.preventDefault();
        })
}
// logout 
else{
    window.location.assign('./../../../admin/admin.html');
}
document.querySelector('#log_out').addEventListener('click',()=>{
    localStorage.removeItem('user')
})
// Responsive Navbar
document.querySelector('.fa-bars').addEventListener('click',()=>{
    document.querySelector('.sidebar').classList.toggle('active_sidebar')
    document.querySelector('.close_sidebar').classList.toggle('active_close')
    document.querySelector('.navbar').classList.toggle('active_navbar')
})
document.querySelector('.fa-xmark').addEventListener('click',()=>{
    document.querySelector('.sidebar').classList.toggle('active_sidebar')
    document.querySelector('.close_sidebar').classList.toggle('active_close')
    document.querySelector('.navbar').classList.toggle('active_navbar')
})