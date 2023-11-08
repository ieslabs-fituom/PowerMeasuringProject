import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSave } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";

const MainSettings = () => {
  return (
    <>
      <div className={`${SettingsStyles.background}`}>
        <HeaderComponent/>
        <div className={`container ${SettingsStyles.form} mt-5 pt-5 pb-5`}>

          </div>
        </div>
      </>
  );
};

export default MainSettings;
