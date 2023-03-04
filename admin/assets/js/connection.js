import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBD6baqsZyNW1gi1o2jtyRy9CQge2HbIrQ",
  authDomain: "libraryproject-1ecf1.firebaseapp.com",
  databaseURL: "https://libraryproject-1ecf1-default-rtdb.firebaseio.com",
  projectId: "libraryproject-1ecf1",
  storageBucket: "libraryproject-1ecf1.appspot.com",
  messagingSenderId: "810344781205",
  appId: "1:810344781205:web:232c0c57f0af726db5d29c"
};

const app = initializeApp(firebaseConfig);
export const db=getDatabase(app)