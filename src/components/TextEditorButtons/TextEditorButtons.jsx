import "./TextEditorButtons.scss";

// libraries
import React from "react";

// icons and images
import { ReactComponent as SummariseImg } from "../../assets/icons/summarise.svg";
import { ReactComponent as InformalImg } from "../../assets/icons/informal.svg";
import { ReactComponent as FormalImg } from "../../assets/icons/formal.svg";
import { ReactComponent as RephraseImg } from "../../assets/icons/rephrase.svg";
import { ReactComponent as ShortenImg } from "../../assets/icons/shorten.svg";
import { ReactComponent as ExpandImg } from "../../assets/icons/expand.svg";

export default function TextEditorButtons({ name, handleGPT }) {
    let svgFile;
    let inputMessage;

    switch (name) {
        case "Summarise":
            svgFile = <SummariseImg className="editor-buttons__img" />;
            inputMessage = "Please, summarise the following snippet";
            break;
        case "Informal":
            svgFile = <InformalImg className="editor-buttons__img" />;
            inputMessage = "Please, make the following snippet an informal tone";
            break;
        case "Formal":
            svgFile = <FormalImg className="editor-buttons__img" />;
            inputMessage = "Please, make the following snippet a formal tone";
            break;
        case "Shorten":
            svgFile = <ShortenImg className="editor-buttons__img" />;
            inputMessage = "Please, shorten the following snippet";
            break;
        case "Expand":
            svgFile = <ExpandImg className="editor-buttons__img" />;
            inputMessage = "Please, expand the following snippet";
            break;
        case "Rephrase":
            svgFile = <RephraseImg className="editor-buttons__img" />;
            inputMessage = "Please, rephrase the following snippet";
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
