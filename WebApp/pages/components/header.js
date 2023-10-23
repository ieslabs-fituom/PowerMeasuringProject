import React from 'react';
import PropTypes from 'prop-types';
import "bootstrap/dist/css/bootstrap.css";
import Image from 'next/image';

import navBarStyles from "../../public/styles/navbar.module.css";

const Header = () => {
    return (
        <div className={`${navBarStyles.navbar}`}>
          <div className={`${navBarStyles.logo}`}>
            <Image
              src="/icons/Hospital_Logo.png"
              width={145}
              height={100}
              alt="Logo" />
          </div>
        </div>
    );
};


export default Header;
