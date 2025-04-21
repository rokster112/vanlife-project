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
  apiKey: "AIzaSyBQPBtkfV70pg5gEU0of0EoM9QBARIu6xI",
  authDomain: "vanlife-b4a5f.firebaseapp.com",
  projectId: "vanlife-b4a5f",
  storageBucket: "vanlife-b4a5f.firebasestorage.app",
  messagingSenderId: "794923213479",
  appId: "1:794923213479:web:18e9bae9ea935ea4e27182",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

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
    console.log(foundUser.data())
    return foundUser.data()
  } catch (error) {
    throw new Error(error.message)
  }
}

// export async function getUser(formData) {
//   try {
//     const snapshot = await getDocs(usersCollectionRef)
//     const users = snapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//     }))
//     const foundUser = users.find(
//       (user) =>
//         user.email === formData.email && user.password === formData.password,
//     )
//     if (!foundUser) {
//       throw new Error(
//         "User not found, please check your credentials, or register",
//       )
//     }
//     return foundUser
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }

//Registering a new user
export async function createUser(email, password) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password)
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
  return vans
}

// Getting one van for vans page
export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const snapshot = await getDoc(docRef)
  return { ...snapshot.data(), id: snapshot.id }
}

export async function getHosts() {
  const q = query()
  const snapshot = await getDocs(usersCollectionRef)
  const users = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return users
}

export async function getHostVans() {
  const q = query()
  const snapshot = await getDocs(usersCollectionRef)
  const users = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  return users
}

export async function getHostVan(id) {
  const docRef = doc(db, "users", id)
  const snapshot = getDoc()
  return { ...snapshot.data(), id: snapshot.id }
}

// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//   const res = await fetch(url)
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       status: res.status,
//     }
//   }
//   const data = await res.json()
//   return data.vans
// }

// export async function getUser(creds) {
//   const res = await fetch("/api/login", {
//     method: "post",
//     body: JSON.stringify(creds),
//   })
//   if (!res.ok) {
//     throw {
//       message: "Failed to log user in",
//       statusText: res.statusText,
//       status: res.status,
//     }
//   }
//   const data = await res.json()
//   return data
// }
