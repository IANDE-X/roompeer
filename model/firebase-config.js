import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBCetCyfSzNQc35S_XrZAVbniFaKMBp2Mw",
  authDomain: "roompeer-6ef1c.firebaseapp.com",
  projectId: "roompeer-6ef1c",
  storageBucket: "roompeer-6ef1c.appspot.com",
  messagingSenderId: "359087035492",
  appId: "1:359087035492:web:68f8a390d13e8b18847b71",
  measurementId: "G-N68JC8KG78",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const getUserCredential = (email, password) => {
  return firebase.auth.EmailAuthProvider.credential(email, password);
};

export { firestore, auth, timestamp, storage };
