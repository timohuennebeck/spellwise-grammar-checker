import "./GrammarError.scss";

// libraries
import React from "react";

// icons
import { ReactComponent as ClipboardImg } from "../../assets/icons/clipboard.svg";

export default function GrammarError({ item }) {
    return (
        <div className="grammar-error">
            <ClipboardImg
                className="grammar-error__svg"
                onClick={() => navigator.clipboard.writeText(item)}
            />
            <pre className="grammar-error__text">{item}</pre>
        </div>
    );
}
