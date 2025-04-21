/* eslint-disable */

import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import {
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "vanlife-b4a5f.firebaseapp.com",
  projectId: "vanlife-b4a5f",
  storageBucket: "vanlife-b4a5f.firebasestorage.app",
  messagingSenderId: "794923213479",
  appId: "1:794923213479:web:18e9bae9ea935ea4e27182",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const currentUser = auth.currentUser

const vansCollectionRef = collection(db, "vans")
const usersCollectionRef = collection(db, "users")

// Logging in - checking if user exists
export async function loginUser(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const foundUser = await getDoc(doc(db, "users", user.user.uid))
    if (!foundUser.exists()) {
      throw new Error("User does not exist, check your credentials or register")
    }
    return foundUser.data()
  } catch (error) {
    throw new Error(error.message)
  }
}

//Registering a new user
export async function createUser(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log("registered user =>", user)
    await setDoc(doc(db, "users", user.user.uid), {
      email: user.user.email,
      id: user.user.uid,
    })
    return user.user
  } catch (error) {
    throw new Error(error.message)
  }
}

// Getting All vans for vans page
export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef)
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  console.log("current user =>", currentUser)
  return vans
}

// Getting one van for vans page
export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const snapshot = await getDoc(docRef)
  return { ...snapshot.data(), id: snapshot.id }
}

export async function getHostVans(id) {
  try {
    const vans = await getVans()
    const userVans = vans.filter((item) => item.hostId === id)
    if (userVans.length === 0) {
      throw new Error("You have no vans in your list")
    }
    return userVans
  } catch (error) {
    throw new Error(error)
  }
}

export async function getHostVan() {}
