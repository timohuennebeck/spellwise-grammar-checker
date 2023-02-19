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
import { ReactComponent as JaImg } from "../../assets/languages/ja.svg";
import { ReactComponent as PlImg } from "../../assets/languages/pl.svg";
import { ReactComponent as PtImg } from "../../assets/languages/pt.svg";
import { ReactComponent as RuImg } from "../../assets/languages/ru.svg";
import { ReactComponent as UkImg } from "../../assets/languages/uk.svg";
import { ReactComponent as ZhImg } from "../../assets/languages/zh.svg";

export default function LanguageDropdown({ handleDeepL }) {
    const [hover, setHover] = useState(false);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    //arr of all flags and language codes used for translation
    const allFlags = [
        { flag: <EnImg className="languages__hover-box-svg" />, languageCode: "EN" },
        { flag: <DeImg className="languages__hover-box-svg" />, languageCode: "DE" },
        { flag: <FrImg className="languages__hover-box-svg" />, languageCode: "FR" },
        { flag: <EsImg className="languages__hover-box-svg" />, languageCode: "ES" },
        { flag: <ItImg className="languages__hover-box-svg" />, languageCode: "IT" },
        { flag: <JaImg className="languages__hover-box-svg" />, languageCode: "JA" },
        { flag: <PlImg className="languages__hover-box-svg" />, languageCode: "PL" },
        { flag: <PtImg className="languages__hover-box-svg" />, languageCode: "PT" },
        { flag: <RuImg className="languages__hover-box-svg" />, languageCode: "RU" },
        { flag: <UkImg className="languages__hover-box-svg" />, languageCode: "UK" },
        { flag: <ZhImg className="languages__hover-box-svg" />, languageCode: "ZH" },
    ];

    return (
        <div
            className="languages"
            onMouseEnter={() => setToggleDropdown(true)}
            onMouseLeave={() => setToggleDropdown(false)}
            onClick={() => setToggleDropdown(false)}
        >
            <div
                className="languages__box"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <LanguagesImg className="languages__box-svg" />
            </div>
            {/* if toggledropdown is enabled activate the dropdown */}
            {toggleDropdown && (
                <div className="languages__hover">
                    {allFlags.map((item) => {
                        return (
                            <div
                                className="languages__hover-box"
                                onClick={() => handleDeepL(item.languageCode)}
                            >
                                {item.flag}
                            </div>
                        );
                    })}
                </div>
            )}
            {hover && (
                <div className="languages__reveal">
                    <p className="languages__reveal-indv">Languages</p>
                </div>
            )}
        </div>
    );
}
