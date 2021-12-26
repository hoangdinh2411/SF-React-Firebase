// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getMetadata
} from "firebase/storage"
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth"

import {
    getFirestore,
    addDoc,
    collection,
    setDoc,
    getDoc,
    doc,
    updateDoc
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4XG89kSdaFR4zt_PI98IlN0x4aoNOPRU",
    authDomain: "todoappbyreactjs.firebaseapp.com",
    databaseURL: "https://todoappbyreactjs-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todoappbyreactjs",
    storageBucket: "todoappbyreactjs.appspot.com",
    messagingSenderId: "1004213403262",
    appId: "1:1004213403262:web:ac8ab6d16b2fdc2f14e22f",
    measurementId: "G-050R3XJ93V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage(app)

//Store 

const addNewUser = (user) => {
    let userId = Math.random() * 10000
    addDoc(collection(db, 'users', userId), {
        user
    })
}


//Login with email 
const signInWithEmail = (email, password) => {
    return (new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                resolve(user)
            })
            .catch((err) => {
                reject(err.message)
            })
    }))


    // } catch (error) {
    //     const errorMessage = error.message
    //     return errorMessage
    // }

}

const signOutUser = async () => {
    try {
        await signOut(auth)
    }
    catch (error) {
        return error
    }

}

//Register By Email
const createUserWithEmail =  (email, password) => {
    return (
        new Promise((resolve, reject) =>{
           createUserWithEmailAndPassword(auth, email, password)
            .then(res =>{
                const user = res.user
                resolve(user)
                return user
            })
            .then(user=>{
                setDoc(doc(db, "users", user.uid), {
                       uid: user.uid,
                       email: user.email
                   });
            })
            .catch(err=>{
                reject(err.message)
            })
            
        })
    )
       

}

// get User information form store 
const getUserInfo = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return 'error'
    }
}


//Update document without overwriting existing
const updateNewProfile = async (userId, field, newValue) => {
    await updateDoc(doc(db, "users", userId), {
        [field]: newValue,
    })

    updateProfile(auth.currentUser, {
        [field]: newValue,
    })
    

}

// Storage 


export { auth, onAuthStateChanged }

//functions
export {
    signInWithEmail,
    signOutUser,
    createUserWithEmail,
    addNewUser,
    getUserInfo,
    updateNewProfile,
    updateProfile,
};


//Storage
export {
    getDownloadURL,
    ref,
    storage,
    getMetadata,
    uploadBytesResumable,
}