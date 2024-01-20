import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faPlus, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
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

import { app } from '../firebase';
import { getAuth } from "firebase/auth";

import { SharedContext } from '../contexts/sharedContext';

export default function DeviceSettings() {
  const auth = getAuth();
  const user = auth.currentUser;
  // const { userId, setUserId} = useContext(SharedContext);
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    if (localStorage.getItem('uid') != null && localStorage.getItem('uid') != -1) {
      setUserId(localStorage.getItem('uid'));
    } else {
      Router.push('/signin');
    }
  }, []);

  const router = useRouter();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newTypeName, setNewTypeName] = useState('');
  const [newLocationName, setNewLocationName] = useState('');

  // Following hook runs at every render of the screen
  useEffect(() => {
    getDeviceTypes();
    getLocations();
  }, []);

  // Function for loading all the device types added by the current user
  const getDeviceTypes = async () => {
    const res = await axios.post('/api/getDeviceTypes', {
      queryType: 2,
      userId: userId
    });

    setDeviceTypes(res.data.result);
  }

  const getLocations = async () => {
    const res = await axios.post('/api/getLocations', {
      queryType: 2,
      userId: userId
    });

    setLocations(res.data.result);
  }

  const cardView = (id, text, type) => { //type=1 for device type, type=2 for location
    return (
      <div className={`px-3 py-3 mx-2 my-1 d-flex flex-row justify-content-between align-items-center rounded-3`}
        style={{ backgroundColor: 'rgba(189, 195, 199,1.0)', height: 40 }}
        key={id}>
        <span>{text}</span>
        <FontAwesomeIcon icon={faTrash} className={`ms-4 text-danger`}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (type == 1)
              deleteDeviceType(id)
            else if (type == 2)
              deleteLocation(id)
          }} />
      </div>
    )
  }

  const addDeviceType = async (typeName) => {
    if (typeName == '') {
      toast.warn('Please enter device type name!');
      return;
    }

    const res = await axios.post('/api/addDeviceType', {
      userId: userId,
      typeName: newTypeName.toUpperCase()
    });

    if (res.status == 200) {
      toast.success('Device type added successfully!');
      getDeviceTypes();
      setNewTypeName('');
    }
    else {
      toast.error('Error in adding device type!');
    }
  }

  const addLocation = async (locationName) => {
    if (locationName == '') {
      toast.warn('Please enter location name!');
      return;
    }

    const res = await axios.post('/api/addLocation', {
      userId: userId,
      locationName: newLocationName.toUpperCase()
    });

    if (res.status == 200) {
      toast.success('Location added successfully!');
      getLocations();
      setNewLocationName('');
    }
    else {
      toast.error('Error in adding location!');
    }
  }

  const deleteDeviceType = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this device type?');

    if (confirmation) {
      const res = await axios.post('/api/deleteDeviceType', {
        deviceTypeId: id
      });

      if (res.status == 200) {
        toast.success('Device type deleted successfully!');
        getDeviceTypes();
      }
      else {
        toast.error('Error in deleting device type!');
      }
    } else {
      return;
    }
  }

  const deleteLocation = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this location?');

    if (confirmation) {
      const res = await axios.post('/api/deleteLocation', {
        locationID: id
      });

      if (res.status == 200) {
        toast.success('Location deleted successfully!');
        getLocations();
      }
      else {
        toast.error('Error in deleting location!');
      }
    } else {
      return;
    }
  }


  return (
    <>
      <div className={`${SettingsStyles.background}`}>
        <HeaderComponent />

        <div className={`container ${SettingsStyles.form} mt-5 pt-5 pb-5`}>

          <h6 className={{}}>Device Types</h6>
          <div className={`row w-100 mt-3`}>
            <div className={`col-md-6 col-0 d-flex flex-row flex-wrap`}>
              {deviceTypes.map((item) => cardView(item.type_id, item.type_name, 1))}
            </div>
            <div className={`col-md-6 col-0 px-2 d-flex flex-column align-items-center`}>
              <div className={`d-flex flex-column justify-content-center w-75`}>
                <div className={`d-flex flex-row align-items-center`}>
                  <FontAwesomeIcon icon={faPlusCircle} className={`${SettingsStyles.topic}`} />
                  <span className={`${SettingsStyles.topic} ms-2`}>Add New Type</span>
                </div>
                <div className={`mt-3`}>
                  {/* <label className={`form-label mt-2 ${SettingsStyles.label}`}>Device Type Name</label> */}
                  <input className="form-control form-control" type="text" placeholder="Enter Type Name"
                    value={newTypeName} maxLength={10} onChange={(event) => setNewTypeName(event.target.value)} />
                </div>
                <div className={`mt-2 align-self-end`}>
                  <ButtonComponent text="Add Device Type" disabled={false} onClick={() => { addDeviceType(newTypeName) }} icon={faPlus} mt={'mt-2'} bgcolor={'btn-primary'} iconColor={'text-white'} textColor={'text-white'} />
                </div>
              </div>
            </div>
          </div>

          <h6 className={`mt-5`}>Locations</h6>
          <div className={`row w-100 mt-3`}>
            <div className={`col-md-6 col-0 d-flex flex-row flex-wrap`}>
              {locations.map((item) => cardView(item.location_id, item.location_name, 2))}
            </div>
            <div className={`col-md-6 col-0 px-2 d-flex flex-column align-items-center`}>
              <div className={`d-flex flex-column justify-content-center w-75`}>
                <div className={`d-flex flex-row align-items-center`}>
                  <FontAwesomeIcon icon={faPlusCircle} className={`${SettingsStyles.topic}`} />
                  <span className={`${SettingsStyles.topic} ms-2`}>Add New Location</span>
                </div>
                <div className={`mt-3`}>
                  {/* <label className={`form-label mt-2 ${SettingsStyles.label}`}>Device Type Name</label> */}
                  <input className="form-control form-control" type="text" placeholder="Enter Location Name"
                    value={newLocationName} maxLength={10} onChange={(event) => setNewLocationName(event.target.value)} />
                </div>
                <div className={`mt-2 align-self-end`}>
                  <ButtonComponent text="Add Location" disabled={false} onClick={() => { addLocation(newLocationName) }} icon={faPlus} mt={'mt-2'} bgcolor={'btn-primary'} iconColor={'text-white'} textColor={'text-white'} />
                </div>
              </div>
            </div>
          </div>
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
