import "./LoadingMessage.scss";

// libraries
import React from "react";

// images
import loadingImg from "../../assets/icons/loading.svg";

export default function LoadingMessage() {
    return (
        <div className="loading">
            <img className="loading__img" src={loadingImg} alt="" />
            <p className="loading__message">Loading...</p>
        </div>
    );
}
