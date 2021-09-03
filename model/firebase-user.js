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
      return {};
    });
};

export const getSearchedPeers = async (queries) => {
  const { country, age, gender, religion, budget_high } = queries;

  let query = firestore.collection("users");
  if (country !== "") query = query.where("country", "==", country);
  if (gender !== "") query = query.where("gender", "==", gender);
  if (age !== "") query = query.where("age", "==", age);
  if (religion !== "") query = query.where("religion", "==", religion);
  if (budget_high !== "") query = query.where("budget_high", "<=", Number(budget_high));
  return query
    .get()
    .then((querySnapshot) => {
      var data = [];
      querySnapshot.forEach((doc) => {
        let user_data = doc.data();
        user_data.created_at = `${user_data.created_at.toDate()}`;
        data.push(user_data);
      });
      return data;
    })
    .catch((error) => {
      throw `Cannot get Documents,${error}`;
    });
};

const user_default_info = {
  created_at: timestamp(),
  prefered_area: "",
  budget_low: 0,
  budget_high: 0,
  smoking: false,
  pets: false,
  noise: false,
  partying: false,
  about: "",
  religion: "",
  astrological_sign: "",
  socials: {
    facebook: "",
    instagram: "",
    twitter: "",
    whatsapp: "",
  },
};

export const updateUserProfileInfo = async (id, new_data) => {
  try {
    firestore.collection("users").doc(id).set(new_data, { merge: true });
    return true;
  } catch (error) {
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
    .catch((error) => {
      if (error.code === "storage/object-not-found") {
        console.log("User does not have a profile picture!");
      } else console.log(error.code);
    }); // User Avatar does not exist.
};
