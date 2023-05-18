// import firebase from "firebase/compat/app";
// import "firebase/compat/storage";

import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics"
import {getStorage} from "firebase/storage" 
const firebaseConfig = {
  apiKey: "AIzaSyCcKlR2ebdnQgsEdiOJsEtkjW80DyPa7DE",

  authDomain: "movie-bbf94.firebaseapp.com",

  projectId: "movie-bbf94",

  storageBucket: "movie-bbf94.appspot.com",

  messagingSenderId: "885758747237",

  appId: "1:885758747237:web:992e352d569c440cae1c8c",

  measurementId: "G-06654W3ZGX",
};

const app = initializeApp(firebaseConfig);
// const analytics= getAnalytics(app)
// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();

export const storage= getStorage();
