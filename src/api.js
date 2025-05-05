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
  addDoc,
  updateDoc,
  serverTimestamp,
  FieldValue,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

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
const user = auth.currentUser
const storage = getStorage(app)

const vansCollectionRef = collection(db, "vans")

export async function loginUser(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    const foundUser = await getDoc(doc(db, "users", user.user.uid))
    return foundUser.data()
  } catch (error) {
    throw new Error("User does not exist, check your credentials or register")
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
  return vans
}

// Getting One van for vans page
export async function getVan(id) {
  const docRef = doc(db, "vans", id)
  const snapshot = await getDoc(docRef)
  return { ...snapshot.data(), id: snapshot.id }
}

// Renting a van
export async function rentVan(id, userId) {
  if (userId) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    const vanData = snapshot.data()
    await updateDoc(docRef, {
      rented: vanData.rented && vanData.rented === userId ? "" : userId,
    })
  } else {
    throw new Error(
      "User credentials not found. Please make sure you're logged in.",
    )
  }
}
// Getting All host vans
export async function getHostVans(id, typeOfList) {
  const vans = await getVans()
  const userVans = vans.filter((item) =>
    typeOfList && typeOfList === "listed"
      ? item.hostId === id
      : typeOfList && typeOfList === "rented"
        ? item.rented === id
        : item.hostId === id,
  )

  if (userVans.length === 0) {
    throw new Error("You have no vans in your list")
  }

  return userVans
}

// Getting One user van
export async function getHostVan(userId, id, typeOfList) {
  try {
    const vans = await getHostVans(userId, typeOfList)
    if (vans.length > 0) {
      const singleVan = vans.find((van) => van.id === id)
      return singleVan
    }
  } catch (error) {
    throw new Error(error)
  }
}

// Post Van
export async function postVan(hostId, data) {
  if (hostId) {
    const { description, imageUrl, name, price, type } = data

    if (!imageUrl) {
      console.error("Invalid image URL:", imageUrl)
      throw new Error("Invalid image or image not selected")
    }

    if (!description || !name || !price || !type) {
      throw new Error("Please fill in all fields")
    }

    const imageRef = ref(storage, `vans/${hostId}/${imageUrl.name}`)

    try {
      await uploadBytes(imageRef, imageUrl)
      const imageDownloadURL = await getDownloadURL(imageRef)
      await addDoc(collection(db, "vans"), {
        name,
        description,
        imageUrl: imageDownloadURL,
        price,
        type,
        hostId,
        rented: "",
        reviews: [],
      })

      console.log("Van added to Firestore successfully.")
    } catch (error) {
      throw new Error("new err =>", error)
    }
  }
}

// Post review
export async function postReview(formData, id, userId, userEmail) {
  const { text, rating } = formData
  try {
    const docRef = doc(db, "vans", id)
    const van = await getVan(id)
    if (!text || !rating) {
      throw new Error("All fields must be filled in")
    }

    if (van.rented !== userId) {
      throw new Error("You need to be renting this van to submit a review")
    }
    const review = {
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      text,
      rating: Number(rating),
      by: userEmail,
      userId: userId,
    }

    await updateDoc(docRef, {
      reviews: arrayUnion(review),
    })
  } catch (error) {
    console.error(error)
  }
}

export async function deleteReview(id, userId) {
  try {
    const docRef = doc(db, "vans", id)
    const van = await getVan(id)
    const filteredReviews = van.reviews.filter((item) => item.userId !== userId)
    await updateDoc(docRef, { reviews: filteredReviews })
  } catch (error) {
    console.error(error)
  }
}
