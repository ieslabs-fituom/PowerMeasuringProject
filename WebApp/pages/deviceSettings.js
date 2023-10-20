import "bootstrap/dist/css/bootstrap.css";
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

export default function DeviceSettings() {
  console.log("deviceSettings");
  return (
    <><div className={`${SettingsStyles.background}`}>
    <div className={`${navBarStyles.navbar}`}>
      <div className={`${navBarStyles.logo}`}>
        <Image
          src="/icons/Hospital_Logo.png"
          Max width={120}
          height={80}
          alt="Picture of the author" />
      </div>
    </div>
    <div className={`${SettingsStyles.form}`}>
      <div className={``}>
        
      </div>
    </div>
      </div></>
  );
}
