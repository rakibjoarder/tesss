
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyArQAsjVObNFvuRrwXT1sqaY6hYEUHS4CM",
    authDomain: "svelte-acc81.firebaseapp.com",
    databaseURL: "https://svelte-acc81-default-rtdb.firebaseio.com",
    projectId: "svelte-acc81",
    storageBucket: "svelte-acc81.appspot.com",
    messagingSenderId: "552074517142",
    appId: "1:552074517142:web:fc8f12867d65ce03ef80b7"
};

initializeApp(firebaseConfig)

const Firestoredb = getFirestore()

export default Firestoredb;