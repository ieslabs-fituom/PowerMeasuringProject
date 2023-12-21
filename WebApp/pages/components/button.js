import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faFilter, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";

const Button = ({ text, disabled, onClick, icon, iconColor, ms, mt, me, mb, bgcolor, textColor, width }) => {
    const styles = {
        width: width,
    }
    return (
        <button disabled={disabled} onClick={onClick} className={`btn ${bgcolor} rounded-2 d-flex justify-content-center align-items-center ${mt} ${ms} ${mb} ${me}`}
            style={styles}>
            <span style={{ fontSize: 13, fontFamily: 'Helvetica Neue'}} className={`${textColor} fw-bold`}>{text}</span>
            <FontAwesomeIcon icon={icon} className={`${iconColor} align-self-center ms-3`} />
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    disabled: false,
    mt: 0,
    mb: 0,
    ms: 0,
    me: 0,
    width: 'auto',
    iconColor: 'text-dark',
    textColor: '#000',
};

export default Button;
