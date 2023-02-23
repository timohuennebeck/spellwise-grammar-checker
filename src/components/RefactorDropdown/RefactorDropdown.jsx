import "./RefactorDropdown.scss";

// libraries
import React from "react";

// icons
import flagImg from "../../assets/languages/uk.svg";
import { ReactComponent as RefactorIcon } from "../../assets/icons/summarise.svg";

export default function RefactorDropdown() {
    const refactorSelection = [
        {
            usage: <RefactorIcon className="refactor__usages-box-img" />,
        },
        {
            usage: <RefactorIcon className="refactor__usages-box-img" />,
        },
        {
            usage: <RefactorIcon className="refactor__usages-box-img" />,
        },
        {
            usage: <RefactorIcon className="refactor__usages-box-img" />,
        },
        {
            usage: <RefactorIcon className="refactor__usages-box-img" />,
        },
    ];

    return (
        <div className="refactor">
            <img className="refactor__flag" src={flagImg} alt="" />
            <div className="refactor__usages">
                {refactorSelection.map((item) => {
                    return <div className="refactor__usages-box">{item.usage}</div>;
                })}
            </div>
        </div>
    );
}
