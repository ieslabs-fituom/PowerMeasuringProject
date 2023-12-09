import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faListDots, faPlus, faPlusCircle, faSearch, faHospital, faCogs } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from "next/link";
import ErrorPage from 'next/error'
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect, useContext } from "react";
import { Router, useRouter } from "next/router";

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";
import DeviceCard from "./components/deviceCard";

import axios from 'axios';

import { SharedContext } from '../contexts/sharedContext';

export default function AllDevices() {

    const { userId, email, setUserId, setEmail } = useContext(SharedContext);
    const [deviceTypes, setDeviceTypes] = useState([]);   // This state is used to store device types added by the current user
    const [locations, setLocations] = useState([]);   // This state is used to store locations added by the current user
    const [devices, setDevices] = useState([]);   // This state is used to store devices added by the current user
    const [processedDevices, setProcessedDevices] = useState([]);   // This state is used to store devices with the relevant type and location

    // Device filter parameters
    const [selectedDeviceType, setSelectedDeviceType] = useState(0);
    const [selectedDeviceLocation, setSelectedDeviceLocation] = useState(0);
    const [searchText, setSearchText] = useState('');

    // Following hook runs at every render of the screen
    useEffect(() => {
        getDeviceTypes();
        getLocations();
        getDevices();
    }, []);

    // Function for loading all the device types added by the current user
    const getDeviceTypes = async () => {
        const res = await axios.post('/api/getDeviceTypes', {
            queryType: 2,
            userId: userId
        });
        console.log(res.status);
        setDeviceTypes(res.data.result);
    }

    // Function for loading all the locations added by the current user
    const getLocations = async () => {
        const res = await axios.post('/api/getLocations', {
            queryType: 2,
            userId: userId
        });
        console.log(res.status);
        setLocations(res.data.result);
    }

    // Function for loading all the devices added by the current user
    const getDevices = async () => {
        const res = await axios.post('/api/getDevices', {
            queryType: 2,
            userId: userId
        });
        console.log(res.status);
        setDevices(res.data.result);
    }

    // This useEffect executes every time the devices state is updated
    useEffect(() => {
        if (devices.length == 0 || deviceTypes.length == 0 || locations.length == 0) {
            return;
        }

        console.log("Devices: ", devices);
        processDevices(devices);

    }, [devices]);

    // This function is used to process loaded devices -> Match devices with location and device types
    const processDevices = (devices) => {
        console.log("Processing devices");
        console.log(devices);
        let newProcessedDevices = [];
        devices.forEach(device => {
            let deviceType = deviceTypes.find(deviceType => deviceType.type_id == device.device_type);
            let deviceLocation = locations.find(location => location.location_id == device.device_location);
            if (deviceType && deviceLocation) {
                newProcessedDevices.push({
                    device_id: device.device_id,
                    device_name: device.device_name,
                    device_type: deviceType.type_name,
                    device_location: deviceLocation.location_name,
                    //device_image: deviceType.type_image
                });
            }
        });
        setProcessedDevices(newProcessedDevices);
    }

    // This useEffect executes every time the device type or location or searchText changed
    useEffect(() => {
        if (devices.length == 0 || deviceTypes.length == 0 || locations.length == 0) {
            return;
        }

        if (selectedDeviceType == 0 && selectedDeviceLocation == 0 && searchText == '') {
            processDevices(devices);
            return;
        } else {
            filterDevices(devices, selectedDeviceType, selectedDeviceLocation, searchText);
        }
    }, [selectedDeviceType, selectedDeviceLocation, searchText]);

    // Function for filtering devices based on device type and location and device naem
    const filterDevices = (devices, selectedDeviceType, selectedDeviceLocation, searchText) => {
        let newProcessedDevices = [];

        // Here while looping through devices, we are checking whether the device type and location matches with the selected ones. Search text should also be a substring from start of the device_name
        // If the selected type or location is 0, then we are not filtering based on that parameter
        devices.forEach(device => {
            let deviceType = deviceTypes.find(deviceType => deviceType.type_id == device.device_type);
            let deviceLocation = locations.find(location => location.location_id == device.device_location);
            if (deviceType && deviceLocation) {
                if ((selectedDeviceType == 0 || deviceType.type_id == selectedDeviceType) && (selectedDeviceLocation == 0 || deviceLocation.location_id == selectedDeviceLocation) && (searchText == '' || device.device_name.toLowerCase().startsWith(searchText.toLowerCase()))) {
                    newProcessedDevices.push({
                        device_id: device.device_id,
                        device_name: device.device_name,
                        device_type: deviceType.type_name,
                        device_location: deviceLocation.location_name,
                        //device_image: deviceType.type_image
                    });
                }
            }
        });

        setProcessedDevices(newProcessedDevices);
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
                                <input type="text" className="form-control rounded-2" placeholder="Search Device" aria-label="search" aria-describedby="basic-addon1"
                                    value={searchText} onChange={(e) => setSearchText(e.target.value)} />
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
                                    <select className={`form-select`} value={selectedDeviceType} placeholder="Select Device Type" onChange={(e) => { setSelectedDeviceType(e.target.value) }}>
                                        <option value={0}>Select Device Type</option>
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
                                    <select className={`form-select`} value={selectedDeviceLocation} placeholder="Select Device Location" onChange={(e) => { setSelectedDeviceLocation(e.target.value) }}>
                                        <option value={0}>Select Device Location</option>
                                        {locations.map((location) => (
                                            <option key={location.location_id} value={location.location_id}>{location.location_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <div className={`row mt-2 justify-content-center`}>
                            <ButtonComponent text="Filter" disabled={false} onClick={() => { }} icon={faFilter} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-light'} width={'35%'} iconColor={'text-primary'} textColor={'text-primary'} />
                        </div> */}

                    </div>

                    <div className={`col-0 col-md-2 order-1 order-md-2 d-flex flex-row flex-md-column align-items-center`}>
                        <Link href="/settings" style={{ width: '100%', textDecoration: 'none' }}>
                            <ButtonComponent text="Settings" disabled={false} onClick={() => { }} icon={faCogs} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-light'} width={'95%'} iconColor={'text-muted'} textColor={'text-muted'} />
                        </Link>
                        <Link href="/deviceSettings?device=null" style={{ width: '100%', textDecoration: 'none' }}>
                            <ButtonComponent text="Add Device" disabled={false} onClick={() => { }} icon={faPlus} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-light'} width={'95%'} iconColor={'text-muted'} textColor={'text-muted'} />
                        </Link>
                    </div>

                </div>

                <hr className="text-white mt-5 w-75" />

                <div className={`container d-flex flex-row flex-wrap justify-content-center align-ietms-center mt-3`}>
                    {processedDevices.map((device) => (
                        <Link href={`/deviceDetails?device=${device.device_id}`} style={{ textDecoration: 'none', color: '#000' }} key={device.device_id}>
                            <DeviceCard id={device.device_id}
                                name={device.device_name}
                                location={device.device_location}
                                image={'/images/sample_device.jpg'}
                                type={device.device_type}
                                onClick={() => console.log(device.device_name)} />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
