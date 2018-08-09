importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// [*] Firebase Configurations
var config = {
     apiKey: "AIzaSyCZWa5wChnendahT6sTdfNJhmFbnI8Cz5g",
    authDomain: "productexplainer.firebaseapp.com",
    databaseURL: "https://productexplainer.firebaseio.com",
    projectId: "productexplainer",
    storageBucket: "productexplainer.appspot.com",
    messagingSenderId: "350462790215"
};

//[*] Initializing our Firebase Application.
firebase.initializeApp(config);

// [*] Initislaizing the Firebase Messaging Object.
const messaging = firebase.messaging();