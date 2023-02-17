import "./GeneratedRecommendations.scss";

// libraries
import React from "react";

// images
import checkImg from "../../assets/icons/check.svg";

// components
import ToClipboard from "../ToClipboard/ToClipboard";

export default function GeneratedRecommendations({ GPTResponse }) {
    return (
        <div className={`recommendations ${GPTResponse.length !== 0 && "remove-defaults"}`}>
            {GPTResponse.length !== 0 ? (
                <div className="recommendations__ai">
                    {GPTResponse.map((item) => {
                        return <ToClipboard item={item} />;
                    })}
                </div>
            ) : (
                <div className="recommendations__box">
                    <img className="recommendations__box-img" src={checkImg} alt="" />
                    <span className="recommendations__box-header">So far, so good!</span>
                    <p>Now, let’s dive deeper and see what alternatives are available.</p>
                    <p className="recommendations__box-fade">
                        P.S. Use // inline to create a customised prompt, i.e. '// what's the
                        definition of dog?'
                    </p>
                </div>
            )}
        </div>
    );
}
