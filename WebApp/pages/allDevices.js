import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faListDots, faPlus, faPlusCircle, faSearch, faHospital, faCogs } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";
import DeviceCard from "./components/deviceCard";

import axios from 'axios';

export default function AllDevices({userId, email}) {

    const [deviceTypes, setDeviceTypes] = useState([]);   // This state is used to store device types added by the current user

    // Following hook runs at every render of the screen
    useEffect(() => {
        getDeviceTypes();
        getLocations();
    }, []);

    // Function for loading all the device types added by the current user
    const getDeviceTypes = async () => {
        const res = await axios.post('/api/getDeviceTypes', {
            userId: userId
        });
        console.log(res.data.result);
        setDeviceTypes(res.data.result);
    }

    const getLocations = async () => {
        const res = await axios.post('/api/getLocations', {
            
        });
        console.log(res.data.result);
        getLocations(res.data.result);
    }

    return (
        <>
            <div className={`${SettingsStyles.background}`}>
                <HeaderComponent />
                <div className={`row container mt-4 justify-content-center`}>
                    <div className={`col-0 col-md-10 order-2 order-md-1 d-flex flex-column justify-content-center`}>
                        {/* <input className="form-control form-control" type="text" placeholder="Search" /> */}
                        <div className={`row  mt-2 mt-md-0`}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-transparent border-0" id="basic-addon1">
                                        <FontAwesomeIcon icon={faSearch} size='1x' className={`text-white align-self-center pt-1 pb-1`} />
                                    </span>
                                </div>
                                <input type="text" className="form-control rounded-2" placeholder="Search Device" aria-label="search" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className={`row mt-0`}>
                            <div className={`col-0 col-md-6  mt-2 mt-md-0`}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-transparent border-0" id="basic-addon2">
                                            <FontAwesomeIcon icon={faListDots} size='1x' className={`text-white align-self-center pt-1 pb-1`} />
                                        </span>
                                    </div>
                                    <select className={`form-select`} value={0} placeholder="Select Device Type">
                                        <option>Select Device Type</option>
                                        {deviceTypes.map((deviceType) => (
                                            <option key={deviceType.type_id} value={deviceType.type_id}>{deviceType.type_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={`col-0 col-md-6 mt-2 mt-md-0`}>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-transparent border-0" id="basic-addon3">
                                            <FontAwesomeIcon icon={faHospital} size='1x' className={`text-white align-self-center pt-1 pb-1`} />
                                        </span>
                                    </div>
                                    <select className={`form-select`} value={0} placeholder="Select Device Location">
                                        <option>Select Device Location</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className={`row mt-2 justify-content-center`}>
                            <ButtonComponent text="Filter" disabled={false} onClick={() => { }} icon={faFilter} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-light'} width={'35%'} iconColor={'text-primary'} textColor={'text-primary'} />
                        </div> */}

                    </div>

                    <div className={`col-0 col-md-2 order-1 order-md-2 d-flex flex-row flex-md-column align-items-center`}>
                        <ButtonComponent text="Settings" disabled={false} onClick={() => { }} icon={faCogs} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-light'} width={'95%'} iconColor={'text-muted'} textColor={'text-muted'} />
                        <ButtonComponent text="Add Device" disabled={false} onClick={() => { }} icon={faPlus} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-light'} width={'95%'} iconColor={'text-muted'} textColor={'text-muted'} />
                    </div>

                </div>

                <hr className="text-white mt-5 w-75" />

                <div className={`container d-flex flex-row flex-wrap justify-content-center align-ietms-center mt-3`}>
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                    <DeviceCard id={0} name={'001/WD-3'} location={'THTR-1'} image={'/images/sample_device.jpg'} type={'ECG SCANNER'} />
                </div>
            </div>
        </>
    )
}

// Following object is used to define default values for the props of the screen. Used for testing purposes
AllDevices.defaultProps = {
    userId: 1,
    email: 'd@d.com'
}