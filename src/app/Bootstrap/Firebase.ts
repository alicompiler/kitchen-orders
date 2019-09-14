import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBHRBQphohRg0i6y4UbjmNQEDlBmi4YzwQ",
    authDomain: "kitchen-orders-78f0f.firebaseapp.com",
    databaseURL: "https://kitchen-orders-78f0f.firebaseio.com",
    projectId: "kitchen-orders-78f0f",
    storageBucket: "kitchen-orders-78f0f.appspot.com",
    messagingSenderId: "839850563122",
    appId: "1:839850563122:web:c1adfb3429e79492"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
