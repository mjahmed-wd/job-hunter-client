import React from "react";
import firebase from "firebase/app";
import { useState } from "react";
import { useEffect } from "react";
import { firebaseInitialization } from "../Login/FirebaseRefectored";
import { useContext } from "react";
import { createContext } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

const ProvideAuth = ({ children }) => {
  
  firebaseInitialization();

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const auth = useProvideAuth();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // refresh JWT token
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ false)
          .then(function (idToken) {
            localStorage.setItem("token", idToken);
          })
          .catch(function (error) {
            // Handle error
          });
        // Check Admin Role
        console.log(user, "user");
        fetch(`http://localhost:5000/checkUserRole/${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.length);
            // if (data.length) {
            //   user.role = "Admin";
            // } else {
            //   // console.log("Role: User");
            //   user.role = "User";
            // }
            user.role = data?.userType?.label;
            if (data?.userType?.label === "Employer") {
              user.jobHourPerMonth = data?.userPackage?.value;
            }
            // console.log(user?.role);
            setCurrentUser(user);
            setPending(false);
          });
      } else {
        console.log(user?.role);
        setCurrentUser(user);
        setPending(false);
      }
    });
  }, []);

  if (pending) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ProvideAuth;

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  firebaseInitialization();
  const history = useHistory();

  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var googleUser = result.user;

        setUser(result.user);
        console.log("signedIN");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const signinWithEmail = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  const signupWithEmail = (email, password, userDetails) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setUser(user);

        axios
          .post("http://localhost:5000/addUser", userDetails)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log("user is signed up", user);

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };
  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };
  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const newUserInfo = { ...user };
        newUserInfo.name = user.displayName;
        newUserInfo.email = user.email;
        newUserInfo.profilePicture = user.photoURL;
        newUserInfo.isSignedIn = true;
        setUser(newUserInfo);
        console.log("clicked");
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signinWithEmail,
    signupWithEmail,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
