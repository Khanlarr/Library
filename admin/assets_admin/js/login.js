import { db } from "./connection.js";
import { get,set,ref,onValue,push } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
if(localStorage.getItem('user')){
  window.location.assign('./../../../admin/panel.html');
}
const btn = document.querySelector(".login__form button");
const user = document.querySelector(".login__form #user");
const pass = document.querySelector(".login__form #pass");
let data=await get(ref(db,'/library/login'))
btn.addEventListener("click", async(e) => {
  if (user.value === "" && pass.value === "") {
    alert("user və parol daxil edilməyib");
  }else if (user.value === "") {
    alert("user daxil edilməyib");
  }else  if (pass.value === "") {
    alert("parol daxil edilməyib");
  } else if (pass.value.length < 8) {
    alert("parol sayı 8 simvoldan az ola bilməz!!");
  }else{
  let data=await get(ref(db,'/library/login'))
  data=data.val();
  if(data.username===user.value && data.password===parseInt(pass.value)){
  localStorage.setItem("user", data.username);   // Locala yazdirma
   window.location.assign('./../../../admin/panel.html');
  }
  else{
    alert("user və ya parol duzgun daxil edilməyib");
  }
  }
  user.value='';
  pass.value=''
  e.preventDefault();
});