import "./GeneratedGrammar.scss";

// libraries
import React from "react";

// images
import checkImg from "../../assets/icons/check.svg";

// components
import GrammarError from "../GrammarError/GrammarError";

export default function GeneratedGrammar({ grammarErrors }) {
    return (
        <div className={`grammar ${grammarErrors.length !== 0 && "remove-defaults"}`}>
            {grammarErrors.length !== 0 ? (
                <div className="grammar__ai">
                    {grammarErrors.map((item) => {
                        return <GrammarError item={item} />;
                    })}
                </div>
            ) : (
                <div className="grammar__box">
                    <img className="grammar__box-img" src={checkImg} alt="" />
                    <span className="grammar__box-header">So far, so good!</span>
                    <p>Now, let’s dive deeper and see what alternatives are available.</p>
                    <p className="grammar__box-fade">
                        P.S. Use // inline to create a customised prompt, i.e. '// what's the
                        definition of dog?'
                    </p>
                </div>
            )}
        </div>
    );
}
