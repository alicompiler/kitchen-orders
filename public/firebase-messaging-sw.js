importScripts('https://www.gstatic.com/firebasejs/6.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.1.1/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyBHRBQphohRg0i6y4UbjmNQEDlBmi4YzwQ",
    authDomain: "kitchen-orders-78f0f.firebaseapp.com",
    databaseURL: "https://kitchen-orders-78f0f.firebaseio.com",
    projectId: "kitchen-orders-78f0f",
    storageBucket: "kitchen-orders-78f0f.appspot.com",
    messagingSenderId: "839850563122",
    appId: "1:839850563122:web:c1adfb3429e79492"
};
console.log('sw');
firebase.initializeApp(firebaseConfig);

firebase.messaging().setBackgroundMessageHandler(function (message) {
    console.log('onMessage', message)
});

console.log('done');


