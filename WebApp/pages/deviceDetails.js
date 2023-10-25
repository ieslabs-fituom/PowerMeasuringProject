import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faListDots, faPlus, faPlusCircle, faSearch, faHospital, faCogs, faCalendarWeek, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import navBarStyles from "../public/styles/navbar.module.css";
import SettingsStyles from "../public/styles/deviceSettings.module.css";

import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

import ButtonComponent from "./components/button";
import HeaderComponent from "./components/header";
import DeviceCard from "./components/deviceCard";

export default function AllDevices() {

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

    return (
        <>
            <div className={`${SettingsStyles.background}`}>
                <HeaderComponent />
                <div className={`container mt-5`}>
                    <div className={`d-flex flex-row justify-content-between align-items-center`}>
                        <h1 className={`text-white`}>ECG MACHINE - 001/WD-03</h1>
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
                </div>


            </div>
        </>
    );
}