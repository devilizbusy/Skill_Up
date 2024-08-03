import {initializeApp} from "firebase/app"
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// const firebaseConfig = {
//   apiKey:"AIzaSyBPgnJfdoMMMpgLQBSyDB5CmfmT9WUjCwo",
//   authDomain: "auth-development-22dc5.firebaseapp.com",
//   projectId: "auth-development-22dc5",
//   storageBucket: "auth-development-22dc5.appspot.com",
//   messagingSenderId: "813648378825",
//   appId: "1:813648378825:web:ccfc5c710891b131220618"
// };

// const firebaseConfig = {
//   apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId:process.env.REACT_APP_FIREBASE_APP_ID
// };

const firebaseConfig = {

  apiKey: "AIzaSyBA9jpAbf3Y1ROdXEhUzwZGw__07kX9gL8",
  authDomain: "skill-up-c45ee.firebaseapp.com",
  databaseURL: "https://skill-up-c45ee-default-rtdb.firebaseio.com",
  projectId: "skill-up-c45ee",
  storageBucket: "skill-up-c45ee.appspot.com",
  messagingSenderId: "782722579720",
  appId: "1:782722579720:web:4b0de277b01f8faea980bd",
  measurementId: "G-C0Q73VZ7SH",

};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);  
export const db= getFirestore(app);
export const storage= getStorage(app);
export const GoogleAuth = new GoogleAuthProvider();
export const FacebookAuth = new FacebookAuthProvider();
