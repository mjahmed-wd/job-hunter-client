import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config.js";
export const handleSignOut = () => {
   return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        const signedOutUser={isSignedIn: false,
            name: "",
            email: "",
            password: "",
            photo: "",}
        return signedOutUser;
      })
      .catch((error) => {
        // An error happened.
      });
  };
export const firebaseInitialization=()=>{
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
}