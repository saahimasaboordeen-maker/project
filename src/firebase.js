import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = { 
apiKey: "AIzaSyC1z__PbCko0KAfLfhvEdcrioeqiBCdNpU",
authDomain: "woocurs-project-52fe8.firebaseapp.com",
projectId: "woocurs-project-52fe8",
storageBucket: "woocurs-project-52fe8.firebasestorage.app",
messagingSenderId: "878207806376",
appId: "1:878207806376:web:3f00e75bbe4ca941210b9d"
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);

export { db }; 
