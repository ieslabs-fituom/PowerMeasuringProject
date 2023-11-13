import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faListDots, faPlus, faPlusCircle, faSearch, faHospital, faCogs, faCalendarWeek, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect, useContext } from "react";
import { Router, useRouter } from "next/router";

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";
import DeviceCard from "./components/deviceCard";

import axios from 'axios';

import { SharedContext } from '../contexts/sharedContext';


export default function AllDevices({ device }) {

    const router = useRouter();
    const { userId, email, setUserId, setEmail } = useContext(SharedContext);
    const [deviceID, setDeviceID] = useState('');
    const [deviceName, setDeviceName] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [deviceLocation, setDeviceLocation] = useState('');
    const [usageData, setUsageData] = useState([
        {
            record_id: 1,
            date: '2023-01-10',
            startTime: '10:00:00',
            endTime: '10:00:00',
            duration: '01 Hour'
        },
        {
            record_id: 2,
            date: '2023-01-10',
            startTime: '10:00:00',
            endTime: '10:00:00',
            duration: '01 Hour'
        },
        {
            record_id: 3,
            date: '2023-01-10',
            startTime: '10:00:00',
            endTime: '10:00:00',
            duration: '01 Hour'
        },
        {
            record_id: 4,
            date: '2023-01-11',
            startTime: '10:00:00',
            endTime: '10:00:00',
            duration: '01 Hour'
        }
    ]);

    // Following hook runs at every render of the screen
    useEffect(() => {
        setDeviceID(device);
        getDeviceDetails(device);
    }, []);

    // Function to load device details using the device id
    const getDeviceDetails = async (device) => {
        const res = await axios.post('/api/getDevices', {
            queryType: 1,
            deviceId: device
        });
        console.log(res.data.result);
        const deviceDetails = res.data.result[0];
        setDeviceName(deviceDetails.device_name);
        setDeviceType(deviceDetails.device_type);
        setDeviceLocation(deviceDetails.device_location);

        getDeviceTypeDetails(deviceDetails.device_type);
        getDeviceLocationDetails(deviceDetails.device_location);
        getDeviceUsageDetails(device);
    }

    // Function to load device type details using the device type id
    const getDeviceTypeDetails = async (typeId) => {
        const res = await axios.post('/api/getDeviceTypes', {
            queryType: 1,
            typeId: typeId
        });
        console.log(res.data.result);
        const deviceTypeDetails = res.data.result[0];
        setDeviceType(deviceTypeDetails.type_name);
    }

    // Function to load device location details using the device location id
    const getDeviceLocationDetails = async (locationId) => {
        const res = await axios.post('/api/getLocations', {
            queryType: 1,
            locationId: locationId
        });
        console.log(res.data.result);
        const deviceLocationDetails = res.data.result[0];
        setDeviceLocation(deviceLocationDetails.location_name);
    }

    // Function to load device usage details using the device id
    const getDeviceUsageDetails = async (device) => {
        const res = await axios.post('/api/getRecords', {
            deviceId: device
        });
        console.log(res.data.result);
        processUsageData(res.data.result);
    }

    // Function to process the device usage data
    const processUsageData = (usageData) => {
        usageData.forEach(record => {
            const startTime = new Date(record.start_time);
            const endTime = new Date(record.end_time);

            // Calculate the time difference in milliseconds
            const timeDifference = endTime - startTime;

            // Calculate hours and minutes
            const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
            const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds

            // Format the duration
            const formattedDuration = `${hours} Hours ${minutes} minutes`;

            console.log(formattedDuration, startTime, endTime); // Output: "1 Hours 0 minutes"

            record.duration = formattedDuration;

            // Start time and end time formating
            // Function to format a date as DD-MM-YY HH:MM:SS
            const formatDate = (date) => {
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
                const year = String(date.getFullYear());
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                const seconds = String(date.getSeconds()).padStart(2, "0");

                return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            };

            // Format start_time and end_time
            const formattedStartTime = formatDate(startTime);
            const formattedEndTime = formatDate(endTime);

            // Extract the date of start_time as DD-MM-YY
            const startDate = formatDate(startTime).split(" ")[0];

            record.startTime = formattedStartTime;
            record.endTime = formattedEndTime;
            record.date = startDate;
        });

        setUsageData(usageData);


    }

    // This is the wrapper around the circular progress bar
    const CircularProgressBar = ({ percentage, hours }) => {
        return (
            <div style={{ width: 200 }}>
                <CircularProgressbar
                    value={percentage}
                    text={hours + ' Hours'}
                    strokeWidth={10}
                    styles={{
                        path: {
                            stroke: `#FF6666`,
                            strokeLinecap: 'round',
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                            transformOrigin: 'center center',
                        },
                        trail: {
                            stroke: '#fff',
                            strokeLinecap: 'round',
                            transformOrigin: 'center center',
                        },
                        text: {
                            fill: '#fff',
                            fontSize: '16px',
                            fontFamily: 'Montserrat',
                            fontWeight: 'bold',
                        },
                        background: {
                            fill: '#3e98c7',
                        },
                    }}
                />
            </div>
        );
    };

    // This is used to style a table row
    const tableRow = (rowData) => {
        const cellStyle = {
            paddingTop: 15,
            paddingBottom: 15,
        }
        return (
            <tr className={`text-center`} key={rowData.record_id}>
                <td style={cellStyle}>{rowData.date}</td>
                <td style={cellStyle}>{rowData.startTime}</td>
                <td style={cellStyle}>{rowData.endTime}</td>
                <td style={cellStyle}>{rowData.duration}</td>
            </tr>
        )
    }

    return (
        <>
            <div className={`${SettingsStyles.background}`}>
                <HeaderComponent />
                <div className={`container mt-5`}>
                    <div className={`d-flex flex-row justify-content-between align-items-center`}>
                        <h1 className={`text-white`}>{deviceName} - {deviceType} | {deviceLocation}</h1>
                        <ButtonComponent text="Device Settings" disabled={false} onClick={() => { }} icon={faCogs} mt={'mt-1'} mb={'mb-1'} ms={'ms-1'} me={'me-1'} bgcolor={'btn-light'} width={'auto'} iconColor={'text-muted'} textColor={'text-muted'} />
                    </div>

                    <hr className="text-white mt-3 w-100" />

                    <div className={`row w-100 mt-5`}>
                        <div className={`col-0 col-md-6 d-flex flex-column justify-content-center align-items-center`}>
                            <div className={`bg-white rounded-4 mt-2 d-flex flex-column ps-3 pt-2 pe-3`}
                                style={{ width: 300, height: 100, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
                                <h6 className="text-secondary">Last 7 Days</h6>
                                <div className={`d-flex flex-row justify-content-between align-items-center`}>
                                    <h3 style={{ color: '#21055C' }} className={`fw-bold mt-2`}>40 Hours</h3>
                                    <FontAwesomeIcon icon={faCalendarWeek} className={`text-success`} size="2x" />
                                </div>
                            </div>
                            <div className={`bg-white rounded-4 mt-4 d-flex flex-column ps-3 pt-2 pe-3`}
                                style={{ width: 300, height: 100, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}>
                                <h6 className="text-secondary">Last 7 Days</h6>
                                <div className={`d-flex flex-row justify-content-between align-items-center`}>
                                    <h3 style={{ color: '#21055C' }} className={`fw-bold mt-2`}>40 Hours</h3>
                                    <FontAwesomeIcon icon={faCalendarAlt} className={`text-danger`} size="2x" />
                                </div>
                            </div>

                        </div>
                        <div className={`col-0 col-md-6 d-flex flex-column justify-content-center align-items-center mt-3 mt-md-0`}>
                            <h4 className={`text-white fw-bold mb-4`}>Today</h4>
                            <CircularProgressBar percentage={50} hours={12} />
                        </div>
                    </div>

                    <div className={`d-flex flex-row justify-content-end align-items-center`} style={{ marginTop: 100 }}>
                        <input type="date" className={`form-control w-25 ms-3`} />
                        <FontAwesomeIcon icon={faFilter} className={`text-white ms-3`} size="1x" />
                    </div>
                    <div className={`table-responsive-md mt-3`} style={{ borderRadius: 10, overflow: 'hidden' }}>
                        <table className={`table table-hover`}>
                            <thead className={``}>
                                <tr className={'text-center'}>
                                    <th style={{ backgroundColor: '#EFEFEF' }} className="pt-3 pb-3">Date</th>
                                    <th style={{ backgroundColor: '#EFEFEF' }} className="pt-3 pb-3">Start Time</th>
                                    <th style={{ backgroundColor: '#EFEFEF' }} className="pt-3 pb-3">End Time</th>
                                    <th style={{ backgroundColor: '#EFEFEF' }} className="pt-3 pb-3">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usageData.map(tableRow)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps({ query }) {
    // Access the 'device' query parameter from the request
    const device = query.device || 'null';

    return {
        props: {
            device,
        },
    };
}