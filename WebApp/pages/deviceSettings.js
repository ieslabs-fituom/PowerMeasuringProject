import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSave } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect, useContext } from "react";
import { Router, useRouter } from "next/router";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";

import axios from 'axios';

import { SharedContext } from '../contexts/sharedContext';

import {app} from '../firebase';
import { getAuth } from "firebase/auth";

export default function DeviceSettings() {

  const auth = getAuth();
    const user = auth.currentUser;
    const { userId, setUserId} = useContext(SharedContext);

    useEffect(() => {
        if (userId!=null) {
            console.log(user)
        } else {
            Router.push('/signin');
        }
    }, []);

  const router = useRouter();
  const { device } = router.query;
  const [isNewDevice, setIsNewDevice] = useState(true);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  // States for device details
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState(0);
  const [deviceLocation, setDeviceLocation] = useState(0);
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
    getLocations();
  }, []);

  useEffect(() => {
    if (!isNewDevice) {
      console.log("Device: ", device);
      getDeviceDetails(device);
    }
  }, [isNewDevice]);

  // Function for loading details of the device if this page is used to update device settings
  const getDeviceDetails = async (device) => {
    const res = await axios.post('/api/getDevices', {
      queryType: 1,
      deviceId: device
    });
    console.log(res.data.result);

    if (res.status == 200) {
      setDeviceName(res.data.result[0].device_name);
      setDeviceType(res.data.result[0].device_type);
      setDeviceLocation(res.data.result[0].device_location);
      setDeviceMacAddress(res.data.result[0].device_mac);
      setDeviceCurrentThreshold(res.data.result[0].device_threshold);
    } else {
      toast.error("Error in loading device details");
      router.back();
    }

  }

  // Function for loading all the device types added by the current user
  const getDeviceTypes = async () => {
    const res = await axios.post('/api/getDeviceTypes', {
      queryType: 2,
      userId: userId
    });
    console.log(res.data.result);
    setDeviceTypes(res.data.result);
  }

  const getLocations = async () => {
    const res = await axios.post('/api/getLocations', {
      queryType: 2,
      userId: userId
    });
    console.log(res.status);
    setLocations(res.data.result);
  }

  const addDevice = async (name, type, location, mac, threshold) => {
    if (name == "" || type == 0 || location == 0 || mac == "" || Number(threshold) == 0) {
      toast.warn("Please fill all the fields");
      return;
    }

    console.log(name, type, location, mac, threshold);
    const res = await axios.post('/api/addDevice', {
      deviceName: name,
      deviceType: type,
      deviceLocation: location,
      deviceMacAddress: mac,
      deviceCurrentThreshold: threshold,
      user: userId
    });

    if (res.status == 200) {
      toast.success("Device added successfully");
    } else {
      toast.error("Error in adding device");
    }
  }

  const updateDevice = async (deviceID,name, type, location, mac, threshold) => {
    if (name == "" || type == 0 || location == 0 || mac == "" || Number(threshold) == 0) {
      toast.warn("Please fill all the fields");
      return;
    }

    console.log(deviceID, name, type, location, mac, threshold);
    const res = await axios.post('/api/updateDevice', {
      deviceId: deviceID,
      deviceName: name,
      deviceType: type,
      deviceLocation: location,
      deviceMacAddress: mac,
      deviceCurrentThreshold: threshold,
    });

    if (res.status == 200) {
      toast.success("Device updated successfully");
    } else {
      toast.error("Error in adding device");
    }

    router.back();
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
          {/* <ButtonComponent text="Select Image" disabled={false} onClick={() => { }} icon={faUpload} mt={'mt-2'} bgcolor={'btn-primary'} iconColor={'text-white'} textColor={'text-white'} /> */}
          <div className={``}>
            <p className={`${SettingsStyles.topic} text-center fw-bold mt-4`}>{(isNewDevice) ? 'Add New' : 'Update'} Device</p>
          </div>
          <div className={`${SettingsStyles.dname}`}>
            <label className={`form-label mt-2 ${SettingsStyles.label}`}>Device Name</label>
            <input className="form-control form-control" type="text" placeholder="Enter Device Name"
              value={deviceName} maxLength={20} onChange={(event) => setDeviceName(event.target.value)} />
          </div>
          <div className={`${SettingsStyles.idloc}`}>
            <div className={`${SettingsStyles.did}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device Type</label>
              <select className={`form-select`} value={deviceType} placeholder="Select Device Type" onChange={(event) => { setDeviceType(event.target.value) }}>
                <option value={0}>Select Device Type</option>
                {(deviceTypes.length > 0) ? (deviceTypes.map((deviceType) => (
                  <option key={deviceType.type_id} value={deviceType.type_id}>{deviceType.type_name}</option>
                ))) : null}
              </select>
            </div>

            <div className={`${SettingsStyles.dlocation}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device Location</label>
              <select className={`form-select`} value={deviceLocation} placeholder="Select Device Location" onChange={(event) => { setDeviceLocation(event.target.value) }}>
                <option value={0}>Select Device Location</option>
                {(locations.length > 0) ? (locations.map((location) => (
                  <option key={location.location_id} value={location.location_id}>{location.location_name}</option>
                ))) : null}
              </select>
            </div>
          </div>
          <div className={`${SettingsStyles.d_ad_cu} `}>
            <div className={`${SettingsStyles.d_address}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device MAC Address</label>
              <input className="form-control form-control" type="text" placeholder="Device MAC Address"
                value={deviceMacAddress} onChange={(event) => setDeviceMacAddress(event.target.value)} />
            </div>

            <div className={`${SettingsStyles.d_current}`}>
              <label className={`form-label mt-5 ${SettingsStyles.label}`}>Device Current Threshold</label>
              <div className={`d-flex flex-row align-items-center`}>
                <input className="form-control form-control" type="Number" placeholder="Device Current Threshold"
                  value={deviceCurrentThreshold} onChange={(event) => setDeviceCurrentThreshold(Number(event.target.value))} />
                <span className={`ms-3`}>A</span>
              </div>
            </div>
          </div>
          <ButtonComponent text="Add Device" disabled={false} onClick={() => { 
            if (isNewDevice) 
              addDevice(deviceName, deviceType, deviceLocation, deviceMacAddress, deviceCurrentThreshold) 
            else
              updateDevice(device, deviceName, deviceType, deviceLocation, deviceMacAddress, deviceCurrentThreshold) 
            }} icon={faSave} mt={'mt-5'} bgcolor={'btn-primary'} iconColor={'text-white'} textColor={'text-white'} />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
      </div>
    </>
  );
}
