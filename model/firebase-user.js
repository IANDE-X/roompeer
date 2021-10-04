import { db, timestamp, storage } from "./firebase-config";
import { doc, getDoc, collection, query, where, getDocs, setDoc, updateDoc, deleteDoc, orderBy, limit, startAfter, endBefore } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export const getUserData = async (user_id) => {
  const docRef = doc(db, "users", user_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return {};
  }
};

export const getUserSnapShot = async (user_id) => {
  const docRef = doc(db, "users", user_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
  } else {
    return {};
  }
};

export const getSearchedPeers = async (queries, lastSeenPeer = null) => {
  const { country, age, gender, religion, budget_high, previous, cursor } = queries;

  let usersRef = collection(db, "users");
  if (country !== "") usersRef = query(usersRef, where("country", "==", country));
  if (gender !== "") usersRef = query(usersRef, where("gender", "==", gender));
  if (age !== "") usersRef = query(usersRef, where("age", "==", age));
  if (religion !== "") usersRef = query(usersRef, where("religion", "==", religion));
  if (budget_high !== "") usersRef = query(usersRef, orderBy("budget_high", "asc"), where("budget_high", "<=", Number(budget_high)));

  if (cursor !== undefined) {
    lastSeenPeer = await getUserSnapShot(cursor);
  }

  const go_back = previous === undefined ? false : true;
  if (lastSeenPeer === null) {
    usersRef = query(usersRef, orderBy("created_at", "desc"), limit(10));
  } else {
    go_back ? (usersRef = query(usersRef, orderBy("created_at", "desc"), endBefore(lastSeenPeer), limit(10))) : (usersRef = query(usersRef, orderBy("created_at", "desc"), startAfter(lastSeenPeer), limit(10)));
  }

  const querySnapshot = await getDocs(usersRef).catch((error) => {
    throw `Cannot get Documents,${error}`;
  });

  var data = [];
  querySnapshot.forEach((doc) => {
    let user_data = { id: doc.id, data: doc.data() };
    user_data.data.created_at = `${user_data.data.created_at.toDate()}`;
    data.push(user_data);
  });
  return data;
};

export const getRecentlyJoinedPeers = async () => {
  let usersRef = collection(db, "users");
  let peers = query(usersRef, orderBy("created_at", "desc"), limit(10));
  const querySnapshot = await getDocs(peers).catch((error) => {
    throw `Cannot get Documents,${error}`;
  });
  var data = [];
  querySnapshot.forEach((doc) => {
    let user_data = { id: doc.id, data: doc.data() };
    data.push(user_data);
  });
  return data;
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
  flatmate_status: true,
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
  const userRef = doc(db, "users", id);
  try {
    updateDoc(userRef, new_data);
    return true;
  } catch (error) {
    return false;
  }
};

export const addUserProfileInfo = async (user_id, user_info) => {
  const userRef = doc(db, "users", user_id);
  try {
    await setDoc(userRef, { ...user_info, ...user_default_info }, { merge: true });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserData = (user_id) => {
  return deleteDoc(doc(db, "users", user_id));
};

export const deleteUserAvatar = async (user_id) => {
  const userAvatarRef = ref(storage, `avatars/${user_id}`);

  return deleteObject(userAvatarRef);
};
