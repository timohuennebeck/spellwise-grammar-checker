import "./ToClipboard.scss";

// libraries
import React from "react";

// icons
import { ReactComponent as ClipboardImg } from "../../assets/icons/clipboard.svg";

export default function ToClipboard({ item }) {
    return (
        <div className="clipboard">
            <ClipboardImg
                className="clipboard__svg"
                onClick={() => navigator.clipboard.writeText(item)}
            />
            <pre className="clipboard__text">{item}</pre>
        </div>
    );
}
