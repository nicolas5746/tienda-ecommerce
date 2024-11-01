import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDZ-7eYXysQcJn2bNZfyOXyqvUgjXBI4hc',
    authDomain: 'tiendaamericana-e5e39.firebaseapp.com',
    projectId: 'tiendaamericana-e5e39',
    storageBucket: 'tiendaamericana-e5e39.appspot.com',
    messagingSenderId: '711419701337',
    appId: '1:711419701337:web:1d0001847a0b5f373ea948'
}

export const database = getFirestore(initializeApp(firebaseConfig));