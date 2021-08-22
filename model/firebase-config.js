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

let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}

export const firebaseInstance = getFirebase();

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const getUserCredential = (email, password) => {
  return firebase.auth.EmailAuthProvider.credential(email, password);
};

export const updateUserProfileInfo = async (id, new_data) => {
  try {
    const db = firebaseInstance.firestore();
    const userRef = db.collection("users").doc(id).set(new_data, { merge: true }).then();
  } catch (error) {
    console.log("Error");
  }
};

const user_default_info = {
  languages: "",
  prefered_area: "",
  prefered_contract_lenght: "",
  budget_low: "",
  budget_high: "",
  smoking: false,
  pets: false,
  about: "",
  religion: "",
  astrological_sign: "",
  socials: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
};

export const addUserProfileInfo = async (user_id, user_info) => {
  if (!firebaseInstance) return;
  try {
    const database = firebaseInstance.firestore();
    const userRef = database.collection("users").doc(user_id);
    await userRef.set(
      {
        ...user_info,
        ...user_default_info,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error.message);
  }
};
