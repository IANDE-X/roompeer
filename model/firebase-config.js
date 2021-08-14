import firebase from "firebase";
import { useSnackbar } from "notistack";

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

export const updateUserProfileInfo = async (id, new_data) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  try {
    const db = firebaseInstance.firestore();
    const userRef = db
      .collection("users")
      .doc(id)
      .set(new_data, { merge: true })
      .then(enqueueSnackbar("Profile Updated!", { variant: "success" }));
  } catch (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};

export const signOut = async () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  try {
    if (firebaseInstance) {
      await firebaseInstance.auth().signOut();
    }
  } catch (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};

export const addUserProfileInfo = async (user_id, user_info) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  if (!firebaseInstance) return;
  try {
    const database = firebaseInstance.firestore();
    const userRef = database.collection("users").doc(user_id);
    await userRef.set(
      {
        first_name: user_info.firstname.value,
        last_name: user_info.lastname.value,
        country: user_info.country.value,
        age: user_info.age.value,
        occupation: user_info.occupation.value,
        residence: user_info.residence.value,
        email: user_info.email.value,
        gender: user_info.gender.value,
        phone_number: "",
        avatar_url: "",
        languages: "",
        prefered_area: "",
        prefered_move_in_date: "",
        prefered_contract_lenght: "",
        rent_low: "",
        rent_high: "",
        smoking: false,
        pets: false,
        hobbies: "",
        sexual_orientation: "",
        astrological_sign: "",
        socials: {
          facebook: "",
          snapchat: "",
          instagram: "",
          whatsapp: "",
          twitter: "",
        },
      },
      { merge: true }
    );
  } catch (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};
