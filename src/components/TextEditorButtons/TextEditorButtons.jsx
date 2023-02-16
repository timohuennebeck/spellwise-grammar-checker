import "./TextEditorButtons.scss";

// libraries
import React from "react";

// icons and images
import { ReactComponent as InformalImg } from "../../assets/icons/informal.svg";
import { ReactComponent as FormalImg } from "../../assets/icons/formal.svg";
import { ReactComponent as EnhanceImg } from "../../assets/icons/enhance.svg";
import { ReactComponent as ShortenImg } from "../../assets/icons/shorten.svg";
import { ReactComponent as ExpandImg } from "../../assets/icons/expand.svg";

export default function TextEditorButtons({ name, handleGPT }) {
    let svgFile;
    let inputMessage;

    switch (name) {
        case "Informal":
            svgFile = <InformalImg className="editor-buttons__img" />;
            inputMessage = "Please, change the following to an informal tone:";
            break;
        case "Formal":
            svgFile = <FormalImg className="editor-buttons__img" />;
            inputMessage = "Please, change the following to an formal tone:";
            break;
        case "Summarise":
            svgFile = <ShortenImg className="editor-buttons__img" />;
            inputMessage = "Please, summarise the following:";
            break;
        case "Elaborate":
            svgFile = <ExpandImg className="editor-buttons__img" />;
            inputMessage = "Please, elaborate the following:";
            break;
        case "Enhance":
            svgFile = <EnhanceImg className="editor-buttons__img" />;
            inputMessage = "Please, rephrase the following to sound smarter:";
            break;
        default:
            svgFile = null;
            break;
    }

    return (
        <div className="editor-buttons" onClick={() => handleGPT(inputMessage)}>
            {svgFile}
            <p className="editor-buttons__name">{name}</p>
        </div>
    );
}
