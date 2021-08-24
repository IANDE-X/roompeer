import { firestore, timestamp } from "./firebase-config";

const user_default_info = {
  created_at: timestamp(),
  prefered_area: "",
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

export const updateUserProfileInfo = async (id, new_data) => {
  try {
    firestore.collection("users").doc(id).set(new_data, { merge: true });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const addUserProfileInfo = async (user_id, user_info) => {
  try {
    const userRef = firestore.collection("users").doc(user_id);
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
