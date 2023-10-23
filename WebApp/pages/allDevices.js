import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
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
                <HeaderComponent />
                <div className={`row container mt-4`}>
                    <div className={`col-0 col-md-10 order-2 order-md-1 d-flex flex-column justify-content-center`}>
                        {/* <input className="form-control form-control" type="text" placeholder="Search" /> */}
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-transparent border-0" id="basic-addon1">
                                    <FontAwesomeIcon icon={faSearch} size='1x' className={`text-white align-self-center pt-1 pb-1`} />
                                </span>
                            </div>
                            <input type="text" class="form-control rounded-2" placeholder="Search Device" aria-label="search" aria-describedby="basic-addon1" />
                        </div>

                    </div>
                    <div className={`col-0 col-md-2 order-1 order-md-2 d-flex flex-row flex-md-column justify-content-center align-items-center`}>
                        <ButtonComponent text="Add Device" disabled={false} onClick={() => { }} icon={faPlus} mt={'mt-1'} mb={'mb-1'} bgcolor={'btn-light'} width={'100%'} iconColor={'text-dark'} />
                        <ButtonComponent text="Filter" disabled={false} onClick={() => { }} icon={faFilter} mt={'mt-1'} mb={'mb-1'} bgcolor={'btn-light'} width={'100%'} iconColor={'text-dark'}/>
                    </div>
                </div>
            </div>
        </>
    )
}