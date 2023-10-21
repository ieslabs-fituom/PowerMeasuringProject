import React from 'react';
import PropTypes from 'prop-types';
import "bootstrap/dist/css/bootstrap.css";
import Image from 'next/image';

const Button = ({ text, disabled, onClick, icon, ms, mt, me, mb }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`btn border btn-primary rounded-2 d-flex justify-content-center align-items-center ${mt} ${ms} ${mb} ${me}`}>
            <span style={{fontSize:13}}>{text}</span>
            <Image
                src={icon}
                width={14}
                height={14}
                alt="Logo"
                className={`ms-3`} />
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
};

export default Button;
