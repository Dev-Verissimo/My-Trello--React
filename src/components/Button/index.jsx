import React, { Children } from "react";
import './style.css'

const Button = (props) => {
    return(
        <button onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button