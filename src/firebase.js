import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBwWuwKJ3YxQhh1-IP6cIveL_a3L9lck4E",
  authDomain: "linkedin-clone-81e8d.firebaseapp.com",
  projectId: "linkedin-clone-81e8d",
  storageBucket: "linkedin-clone-81e8d.appspot.com",
  messagingSenderId: "775142827390",
  appId: "1:775142827390:web:e4f8170a33055872acbf2f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;
