import "bootstrap/dist/css/bootstrap.css";
import { Montserrat } from 'next/font/google';
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
          Max width={145}
          height={100}
          alt="Picture of the author" />
      </div>
    </div>
    <div className={`${SettingsStyles.form}`}>
      <div className={``}>
      <p className={`${SettingsStyles.topic } text-center mt-5 fw-bold`}>Device Management</p>
      </div>
      <div className={`${SettingsStyles.dname}`}>
      <input class="form-control form-control mt-4" type="text" placeholder="Enter Device Name" />
      </div>
      <div className={`${SettingsStyles.idloc}`}>
        <div className={`${SettingsStyles.did}`}>
        <input class="form-control form-control mt-5" type="text" placeholder="Enter Device Id" />
        </div>
        
        <div className={`${SettingsStyles.dlocation}`}>
        <input class="form-control form-control mt-5" type="text" placeholder="Enter Location" />
        </div>
      </div>
      <div className={`${SettingsStyles.d_ad_cu} `}>
        <div className={`${SettingsStyles.d_address}`}>
        <input class="form-control form-control mt-5" type="text" placeholder="Device Mac Address" />
        </div>
        
        <div className={`${SettingsStyles.d_current}`}>
        <input class="form-control form-control mt-5" type="text" placeholder="Device Current Threshold" />
        </div>
        <div className={`${SettingsStyles.d_current_A} mt-5`}>
        A
        </div>
      </div>

    </div>
      </div></>
  );
}
