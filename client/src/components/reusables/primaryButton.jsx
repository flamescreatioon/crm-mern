import React, { Children } from "react";
import '../../styles/button.css';

const PrimaryButton =({children, onClick, type}) =>{
    return(
        <button className="primary-button" type={type} onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton;