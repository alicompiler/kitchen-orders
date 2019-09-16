import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7ttOQvKVa_T51kBWaNDe21P-QC8Q0gqs",
    authDomain: "kitchen-order-bgw.firebaseapp.com",
    databaseURL: "https://kitchen-order-bgw.firebaseio.com",
    projectId: "kitchen-order-bgw",
    storageBucket: "kitchen-order-bgw.appspot.com",
    messagingSenderId: "291598240312",
    appId: "1:291598240312:web:ed4a36baea1b3c98"
};


firebase.initializeApp(firebaseConfig);

export default firebase;
