import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faListDots, faPlus, faPlusCircle, faSearch, faHospital, faCogs, faUser } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from "next/link";
import ErrorPage from 'next/error'
import ButtonComponent from "./components/button";
import SettingsStyles from "../public/styles/deviceSettings.module.css";
import SigninStyles from "../public/styles/signin.module.css";
import { useState, useEffect, useContext } from "react";
import Router from "next/router";
import HeaderComponent from "./components/header";
import {app} from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { SharedContext } from '../contexts/sharedContext';





export default function AllDevices() {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const {userID, setUserID} = useContext(SharedContext);

    const handleSignin = () =>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('Login Success!');
                setUserID(userCredential.user);
                Router.push('/allDevices');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    setError('Wrong Credentials entered.');
                } else if (errorCode === 'auth/user-not-found') {
                    setError('User not found.');
                } else if (errorCode === 'auth/invalid-credential') {
                    setError('Invalid credentials provided.');
                } else {
                    setError("Something went wrong! " + errorMessage);
                }
            });

    }

    return (
        <>
            <div className={`${SettingsStyles.background}`}>
                <HeaderComponent />

            <div className={`${SigninStyles.signinContainer}`}>
                <div className={`${SigninStyles.signinForm}`}>
                    <div className={`${SigninStyles.signinFormHeader}`}>
                        <h1 className={`${SigninStyles.signinFormHeaderTitle}`}>Sign In</h1>
                    </div>
                    <div className={`${SigninStyles.signinFormBody}`}>
                        <div className={`${SigninStyles.signinFormError}`}>
                            <p>{error}</p>
                        </div>
                        <div>
                            <div className={`${SigninStyles.signinFormBodyInput}`}>
                                <label className={`${SigninStyles.signinFormBodyInputLabel}`}>Email</label>
                                <input type="email" className={`${SigninStyles.signinFormBodyInputField}`} placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}} />
                            </div>
                            <div className={`${SigninStyles.signinFormBodyInput}`}>
                                <label className={`${SigninStyles.signinFormBodyInputLabel}`}>Password</label>
                                <input type="password" className={`${SigninStyles.signinFormBodyInputField}`} placeholder="Enter your password" onChange={(e) => {setPassword(e.target.value)}}/>
                            </div>
                            <div className={`${SigninStyles.signinFormBodyInput}`}>
                            <ButtonComponent text="Sign In" onClick={handleSignin} icon={faUser} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-primary'} width={'auto'}  />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>

            <div className={`${SigninStyles.footer}`}>
                <p className={`text-center`}>© 2024 IoT and Embedded Systems Labs - Faculty of Information Technology. University of Moratuwa. </p>

            </div>





        </>
    )
}
