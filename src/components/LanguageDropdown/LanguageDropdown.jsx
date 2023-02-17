import "./LanguageDropdown.scss";

// libraries
import React, { useState } from "react";

// icons
import { ReactComponent as LanguagesImg } from "../../assets/icons/languages.svg";
import { ReactComponent as EnImg } from "../../assets/languages/en.svg";
import { ReactComponent as DeImg } from "../../assets/languages/de.svg";
import { ReactComponent as FrImg } from "../../assets/languages/fr.svg";
import { ReactComponent as EsImg } from "../../assets/languages/es.svg";
import { ReactComponent as ItImg } from "../../assets/languages/it.svg";

export default function LanguageDropdown() {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const allFlags = [
        <EnImg className="languages__hover-box-svg" />,
        <DeImg className="languages__hover-box-svg" />,
        <FrImg className="languages__hover-box-svg" />,
        <EsImg className="languages__hover-box-svg" />,
        <ItImg className="languages__hover-box-svg" />,
    ];

    return (
        <div
            className="languages"
            onMouseEnter={() => setToggleDropdown(true)}
            onMouseLeave={() => setToggleDropdown(false)}
        >
            <div className="languages__box">
                <LanguagesImg className="languages__box-svg" />
            </div>
            {toggleDropdown && (
                <div className="languages__hover">
                    {allFlags.map((item) => {
                        return <div className="languages__hover-box">{item}</div>;
                    })}
                </div>
            )}
        </div>
    );
}
