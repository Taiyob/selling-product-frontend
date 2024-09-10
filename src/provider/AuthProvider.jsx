import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';

const auth = getAuth(app);
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const googleLogin = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    }

    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoader(false);
        });
        return () => {
            return unSubscribe();
        }
    }, []);

    const updateUserProfile = (name, photo) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    }

    const logout = () => {
        setLoader(true);
        return signOut(auth);
    }

    const info = { user, googleLogin, createUser, login, updateUserProfile, logout, loader };
    return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;