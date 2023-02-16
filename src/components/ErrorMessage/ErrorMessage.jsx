import "./ErrorMessage.scss";

// libraries
import React from "react";

// images
import errorImg from "../../assets/icons/error.svg";

export default function ErrorMessage({ message }) {
    return (
        <div className="error">
            <img className="error__img" src={errorImg} alt="" />
            <p className="error__message">{message}</p>
        </div>
    );
}
