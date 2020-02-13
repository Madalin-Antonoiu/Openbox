import firebase from 'firebase/app';
import 'firebase/firestore';
// import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVF7yN6SqegkvQShT32RK6LjgC54DEEwk",
    authDomain: "vue-realtime-chatapp.firebaseapp.com",
    databaseURL: "https://vue-realtime-chatapp.firebaseio.com",
    projectId: "vue-realtime-chatapp",
    storageBucket: "vue-realtime-chatapp.appspot.com",
    messagingSenderId: "367302784328",
    appId: "1:367302784328:web:e2a509939f81c4b1f96f7d",
    measurementId: "G-04KZWX453H"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// firebaseApp.firestore().settings({ timestampsInSnapshots: true});

export default firebaseApp.firestore()