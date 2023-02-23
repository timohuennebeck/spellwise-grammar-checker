import "./TextEditorButtons.scss";

// libraries
import React from "react";

// icons and images
import TextAlignImg from "../../assets/icons/text-align.svg";

export default function TextEditorButtons() {
    return <div className="editor-buttons">
        <img className="editor-buttons__img" src={TextAlignImg} alt="" />
    </div>;
}
