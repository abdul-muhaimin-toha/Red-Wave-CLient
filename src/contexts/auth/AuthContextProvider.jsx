import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useAxiosPublic from "@/hooks/axios/useAxiosPublic";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userInfo = { email: user.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            sessionStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        setUser(null);
        sessionStorage.removeItem("access-token");
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createNewUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailPassLogin = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = () => {
    setIsLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const updateUserProfile = (name, photo) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authValue = {
    user,
    isLoading,
    setIsLoading,
    createNewUser,
    emailPassLogin,
    googleLogin,
    githubLogin,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
