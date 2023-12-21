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
import { Router, useRouter } from "next/router";

import HeaderComponent from "./components/header";

export default function AllDevices() {


    return (
        <>
            <div className={`${SettingsStyles.background}`}>
                <HeaderComponent />
                

            {/* create a login form to sign up user using bootstrap */}

            <div className={`${SigninStyles.signinContainer}`}>
                <div className={`${SigninStyles.signinForm}`}>
                    <div className={`${SigninStyles.signinFormHeader}`}>
                        <h1 className={`${SigninStyles.signinFormHeaderTitle}`}>Sign In</h1>
                    </div>
                    <div className={`${SigninStyles.signinFormBody}`}>
                        <form>
                            <div className={`${SigninStyles.signinFormBodyInput}`}>
                                <label className={`${SigninStyles.signinFormBodyInputLabel}`}>Email</label>
                                <input type="email" className={`${SigninStyles.signinFormBodyInputField}`} placeholder="Enter your email" />
                            </div>
                            <div className={`${SigninStyles.signinFormBodyInput}`}>
                                <label className={`${SigninStyles.signinFormBodyInputLabel}`}>Password</label>
                                <input type="password" className={`${SigninStyles.signinFormBodyInputField}`} placeholder="Enter your password" />
                            </div>
                            <div className={`${SigninStyles.signinFormBodyInput}`}>
                            <ButtonComponent text="Sign In" onClick={() => { }} icon={faUser} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-primary'} width={'auto'}  />
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                
            </div>
        </>
    )
}
