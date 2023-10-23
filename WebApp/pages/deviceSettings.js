import "bootstrap/dist/css/bootstrap.css";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";

export default function DeviceSettings() {
  return (
    <>
      <div className={`${SettingsStyles.background}`}>
        <HeaderComponent/>
        <div className={`container ${SettingsStyles.form} mt-5 pt-5 pb-5`}>
          <Image
            src="/images/sample_device.jpg"
            width={120}
            height={120}
            alt="Logo"
            className={`rounded-circle object-fit-cover`} />
          <ButtonComponent text="Select Image" disabled={false} onClick={() => { }} icon={'/icons/upload.png'} mt={'mt-2'} />
          <div className={``}>
            <p className={`${SettingsStyles.topic} text-center fw-bold mt-4`}>Add New Device</p>
          </div>
          <div className={`${SettingsStyles.dname}`}>
            <label className={`form-label mt-2 ${SettingsStyles.label}`}>Device Name</label>
            <input className="form-control form-control" type="text" placeholder="Enter Device Name" />
          </div>
          <div className={`${SettingsStyles.idloc}`}>
            <div className={`${SettingsStyles.did}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device ID</label>
              <input className="form-control form-control" type="text" placeholder="Enter Device Id" />
            </div>

            <div className={`${SettingsStyles.dlocation}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device ID</label>
              <input className="form-control form-control" type="text" placeholder="Enter Location" />
            </div>
          </div>
          <div className={`${SettingsStyles.d_ad_cu} `}>
            <div className={`${SettingsStyles.d_address}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device MAC Address</label>
              <input className="form-control form-control" type="text" placeholder="Device MAC Address" />
            </div>

            <div className={`${SettingsStyles.d_current}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device Current Threshold</label>
              <div className={`d-flex flex-row align-items-center`}>
                <input className="form-control form-control" type="text" placeholder="Device Current Threshold" />
                <span className={`ms-3`}>A</span>
              </div>
            </div>
          </div>
          <ButtonComponent text="Add Device" disabled={false} onClick={() => { }} icon={'/icons/plus-white.png'} mt={'mt-5'} />

        </div>
      </div>
    </>
  );
}
