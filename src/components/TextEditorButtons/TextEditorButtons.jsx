import "./TextEditorButtons.scss";

// libraries
import React from "react";

// icons and images
import { ReactComponent as FixGrammarImg } from "../../assets/icons/fix-grammar.svg";
import { ReactComponent as SummariseImg } from "../../assets/icons/summarise.svg";
import { ReactComponent as InformalImg } from "../../assets/icons/informal.svg";
import { ReactComponent as FormalImg } from "../../assets/icons/formal.svg";
import { ReactComponent as RephraseImg } from "../../assets/icons/rephrase.svg";
import { ReactComponent as ShortenImg } from "../../assets/icons/shorten.svg";
import { ReactComponent as ExpandImg } from "../../assets/icons/expand.svg";

export default function TextEditorButtons({ name, handleGrammar, handleGPT }) {
    let svgFile;
    let callFunction;

    switch (name) {
        case "Fix Grammar":
            svgFile = <FixGrammarImg className="editor-buttons__img" />;
            callFunction = () => handleGrammar();
            break;
        case "Summarise":
            svgFile = <SummariseImg className="editor-buttons__img" />;
            callFunction = () => handleGPT("Please, summarise the following snippet");
            break;
        case "Informal":
            svgFile = <InformalImg className="editor-buttons__img" />;
            callFunction = () => handleGPT("Please, make the following snippet an informal tone");
            break;
        case "Formal":
            svgFile = <FormalImg className="editor-buttons__img" />;
            callFunction = () => handleGPT("Please, make the following snippet a formal tone");
            break;
        case "Shorten":
            svgFile = <ShortenImg className="editor-buttons__img" />;
            callFunction = () => handleGPT("Please, shorten the following snippet");
            break;
        case "Expand":
            svgFile = <ExpandImg className="editor-buttons__img" />;
            callFunction = () => handleGPT("Please, expand the following snippet");
            break;
        case "Rephrase":
            svgFile = <RephraseImg className="editor-buttons__img" />;
            callFunction = () => handleGPT("Please, rephrase the following snippet");
            break;
        default:
            svgFile = null;
            break;
    }

    return (
        <div className="editor-buttons" onClick={() => callFunction()}>
            {svgFile}
            <p className="editor-buttons__name">{name}</p>
        </div>
    );
}
