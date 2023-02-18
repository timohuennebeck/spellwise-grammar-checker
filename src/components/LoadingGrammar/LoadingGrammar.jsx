import "./LoadingGrammar.scss";

// libraries
import React from "react";

// images
import loadingImg from "../../assets/icons/loading-grammar.svg";

export default function LoadingGrammar() {
    return (
        <div className="loading-grammar">
            <img className="loading-grammar__img" src={loadingImg} alt="" />
            <p className="loading-grammar__message">Fixing Grammar...</p>
        </div>
    );
}
