import "./LanguageDropdown.scss";

// libraries
import React, { useState } from "react";

// images
import alignImg from "../../assets/icons/text-align.svg";
import triangleImg from "../../assets/icons/triangle.png";

// icons
import { ReactComponent as LanguagesImg } from "../../assets/icons/languages.svg";
import { ReactComponent as EnImg } from "../../assets/languages/en.svg";
import { ReactComponent as DeImg } from "../../assets/languages/de.svg";
import { ReactComponent as FrImg } from "../../assets/languages/fr.svg";
import { ReactComponent as EsImg } from "../../assets/languages/es.svg";
import { ReactComponent as ItImg } from "../../assets/languages/it.svg";

export default function LanguageDropdown({ handleDeepL }) {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    //arr of all flags and language codes used for translation
    const allFlags = [
        { flag: <EnImg className="languages__flags-hover-item-indv" />, languageCode: "EN" },
        { flag: <DeImg className="languages__flags-hover-item-indv" />, languageCode: "DE" },
        { flag: <FrImg className="languages__flags-hover-item-indv" />, languageCode: "FR" },
        { flag: <EsImg className="languages__flags-hover-item-indv" />, languageCode: "ES" },
        { flag: <ItImg className="languages__flags-hover-item-indv" />, languageCode: "IT" },
    ];

    return (
        <div className="languages" onClick={() => setToggleDropdown(!toggleDropdown)}>
            <div className="languages__flags">
                <EnImg className="languages__flags-current" />
                {toggleDropdown && (
                    <div className="languages__flags-hover">
                        {allFlags.map((item) => {
                            return <div className="languages__flags-hover-item">{item.flag}</div>;
                        })}
                    </div>
                )}
            </div>
            <img className="languages__align" src={alignImg} alt="" />
            <img
                className={`languages__triangle ${toggleDropdown && "flip"}`}
                src={triangleImg}
                alt=""
            />
        </div>
    );
}
