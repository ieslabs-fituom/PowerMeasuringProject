import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSave } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect, useContext } from "react";
import { Router, useRouter } from "next/router";

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";

import axios from 'axios';

import { SharedContext } from '../contexts/sharedContext';

export default function DeviceSettings() {

  const router = useRouter();
  const { device } = router.query;
  const { userId, setUserId } = useContext(SharedContext);
  const [isNewDevice, setIsNewDevice] = useState(false);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [deviceLocations, setDeviceLocations] = useState([]);

  // States for device details
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [deviceLocation, setDeviceLocation] = useState('');
  const [deviceMacAddress, setDeviceMacAddress] = useState('');
  const [deviceCurrentThreshold, setDeviceCurrentThreshold] = useState('');

  // Following hook runs at every render of the screen
  useEffect(() => {
    if (device == 'null') {
      setIsNewDevice(true);
    }
    else {
      setIsNewDevice(false);
    }

    getDeviceTypes();
  }, []);

  // Function for loading all the device types added by the current user
  const getDeviceTypes = async () => {
    const res = await axios.post('/api/getDeviceTypes', {
      userId: userId
    });
    console.log(res.data.result);
    setDeviceTypes(res.data.result);
  }

  const saveDevice = async () => {

  }

  return (
    <>
      <div className={`${SettingsStyles.background}`}>
        <HeaderComponent />
        <div className={`container ${SettingsStyles.form} mt-5 pt-5 pb-5`}>
          <Image
            src="/images/sample_device.jpg"
            width={120}
            height={120}
            alt="Logo"
            className={`rounded-circle object-fit-cover`} />
          <ButtonComponent text="Select Image" disabled={false} onClick={() => { }} icon={faUpload} mt={'mt-2'} bgcolor={'btn-primary'} iconColor={'text-white'} textColor={'text-white'} />
          <div className={``}>
            <p className={`${SettingsStyles.topic} text-center fw-bold mt-4`}>Add New Device</p>
          </div>
          <div className={`${SettingsStyles.dname}`}>
            <label className={`form-label mt-2 ${SettingsStyles.label}`}>Device Name</label>
            <input className="form-control form-control" type="text" placeholder="Enter Device Name" 
              value={deviceName} onChange={(event) => setDeviceName(event.target.value)}/>
          </div>
          <div className={`${SettingsStyles.idloc}`}>
            <div className={`${SettingsStyles.did}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device Type</label>
              <select className={`form-select`} value={0} placeholder="Select Device Type" onChange={(event) => {setDeviceType(event.target.value)}}>
                <option value={0}>Select Device Type</option>
                {deviceTypes.map((deviceType) => (
                  <option key={deviceType.type_id} value={deviceType.type_id}>{deviceType.type_name}</option>
                ))}
              </select>
            </div>

            <div className={`${SettingsStyles.dlocation}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device Location</label>
              <select className={`form-select`} value={0} placeholder="Select Device Location" onChange={(event) => {setDeviceLocation(event.target.value)}}>
                <option>Select Device Location</option>
                {deviceLocations.map((location) => (
                  <option key={location.location_id} value={location.location_id}>{location.location_name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={`${SettingsStyles.d_ad_cu} `}>
            <div className={`${SettingsStyles.d_address}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device MAC Address</label>
              <input className="form-control form-control" type="text" placeholder="Device MAC Address" 
                value={deviceMacAddress} onChange={(event) => setDeviceMacAddress(event.target.value)}/>
            </div>

            <div className={`${SettingsStyles.d_current}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device Current Threshold</label>
              <div className={`d-flex flex-row align-items-center`}>
                <input className="form-control form-control" type="Number" placeholder="Device Current Threshold" 
                  value={deviceCurrentThreshold} onChange={(event) => setDeviceCurrentThreshold(Number(event.target.value))}/>
                <span className={`ms-3`}>A</span>
              </div>
            </div>
          </div>
          <ButtonComponent text="Add Device" disabled={false} onClick={() => { }} icon={faSave} mt={'mt-5'} bgcolor={'btn-primary'} iconColor={'text-white'} textColor={'text-white'} />

        </div>
      </div>
    </>
  );
}
