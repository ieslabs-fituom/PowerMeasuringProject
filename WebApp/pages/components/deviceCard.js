import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faFilter, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";

const DeviceCard = ({ id, name, location, type, image }) => {
    const styles = {
        width: 280,
        height: 220
    }
    return (
        <div className={`bg-white rounded-3 m-2 p-3`}
            style={styles}>
            <Image
                src={image}
                width={243}
                height={130}
                alt="Logo"
                className={`rounded-3 object-fit-cover`} />
            <div className={`w-100 d-flex flex-row justify-content-between align-items-center mt-2`}>
                <div style={{width:100, height:60}} className={``}>
                    <div className={`w-100 d-flex flex-row justify-content-center align-items-center ps-1 pe-1 pt-1 pb-1 rounded-2 mb-1`}
                    style={{backgroundColor:'#A2E3FF', fontSize:12}}>
                        {location}
                    </div>
                    <div className={`w-100 d-flex flex-row justify-content-center align-items-center ps-1 pe-1 pt-1 pb-1 rounded-2 mt-1`}
                    style={{backgroundColor:'#FFF0A2', fontSize:12}}>
                        {type}
                    </div>
                </div>
                <div style={{width:140, height:60, color:'#21055C'}} className={`d-flex flex-row justify-content-end fw-bold`}>
                    {name}
                </div>

            </div>
        </div>
    );
};

DeviceCard.defaultProps = {

};

export default DeviceCard;
