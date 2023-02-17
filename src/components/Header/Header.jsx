import "./Header.scss";

// libraries
import React from "react";

// icons and images
import logoImg from "../../assets/icons/spellwise-logo.svg";
import profileImg from "../../assets/images/portrait.jpg";
import googleImg from "../../assets/images/google-chrome-logo.png";
import upgradeImg from "../../assets/icons/upgrade.svg";

export default function Header() {
    return (
        <div className="header">
            <img className="header__logo" src={logoImg} alt="" />
            <nav className="header__nav">
                <div className="header__nav-chrome">
                    <img className="header__nav-chrome-logo" src={googleImg} alt="" />
                    <p className="header__nav-chrome-cta">Download Extension</p>
                </div>
                {/* <div className="header__nav-upgrade">
                    <img className="header__nav-upgrade-logo" src={upgradeImg} alt="" />
                    <p className="header__nav-upgrade-cta">Upgrade</p>
                </div> */}
                <img className="header__nav-profile" src={profileImg} alt="" />
            </nav>
        </div>
    );
}
