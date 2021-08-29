import { firestore, timestamp, storage } from "./firebase-config";

export const getUserData = async (user_id) => {
  let query = firestore.collection("users").doc(user_id);
  return query
    .get()
    .then((doc) => {
      if (doc.exists) {
        var data = doc.data();
        return data;
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

const user_default_info = {
  created_at: timestamp(),
  prefered_area: "",
  budget_low: 0,
  budget_high: 0,
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

export const deleteUserData = (user_id) => {
  return firestore.collection("users").doc(user_id).delete();
};

export const deleteUserAvatar = async (user_id) => {
  var storageRef = storage.ref("avatars");
  return await storageRef
    .child(user_id)
    .delete()
    .catch((error) => {}); // User Avatar does not exist.
};
