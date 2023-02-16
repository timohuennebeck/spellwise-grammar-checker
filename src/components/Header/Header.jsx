import "./Header.scss";

// libraries
import React from "react";

// icons and images
import logoImg from "../../assets/icons/spellwise-logo.svg";
import profileImg from "../../assets/images/portrait.jpg";

export default function Header() {
    return (
        <div className="header">
            <img className="header__logo" src={logoImg} alt="" />
            <nav className="header__nav">
                <div className="header__nav-chrome">
                    <img src="" alt="" />
                    <p className="header__nav-chrome-cta">Download Extension</p>
                </div>
                <div className="header__nav-upgrade">
                    <img src="" alt="" />
                    <p className="header__nav-upgrade-cta">Upgrade</p>
                </div>
                <img className="header__nav-profile" src={profileImg} alt="" />
            </nav>
        </div>
    );
}
