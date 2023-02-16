import "./TextEditorButtons.scss";

// libraries
import React from "react";

// icons and images
import { ReactComponent as InformalImg } from "../../assets/icons/informal.svg";
import { ReactComponent as FormalImg } from "../../assets/icons/formal.svg";
import { ReactComponent as EnhanceImg } from "../../assets/icons/enhance.svg";
import { ReactComponent as ShortenImg } from "../../assets/icons/shorten.svg";
import { ReactComponent as ExpandImg } from "../../assets/icons/expand.svg";

export default function TextEditorButtons({ name }) {
    let svgFile;

    switch (name) {
        case "Informal":
            svgFile = <InformalImg className="editor-buttons__img" />;
            break;
        case "Formal":
            svgFile = <FormalImg className="editor-buttons__img" />;
            break;
        case "Shorten":
            svgFile = <ShortenImg className="editor-buttons__img" />;
            break;
        case "Expand":
            svgFile = <ExpandImg className="editor-buttons__img" />;
            break;
        case "Enhance":
            svgFile = <EnhanceImg className="editor-buttons__img" />;
            break;
        default:
            svgFile = null;
            break;
    }

    return (
        <div className="editor-buttons">
            {svgFile}
            <p className="editor-buttons__name">{name}</p>
        </div>
    );
}
