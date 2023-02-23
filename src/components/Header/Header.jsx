import "./Header.scss";

// libraries
import React from "react";

// icons and images
import logoImg from "../../assets/icons/spellwise-logo.png";
import googleImg from "../../assets/images/google-chrome-logo.png";
import starLightPurpleImg from "../../assets/icons/start-light-purple.png";
import startPurple from "../../assets/icons/star-purple.png";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <img className="header__logo-img" src={logoImg} alt="" />
                {/* <p className="header__logo-name">spellwise</p> */}
            </div>
            <nav className="header__nav">
                {/* <div className="header__nav-chrome">
                    <img className="header__nav-chrome-logo" src={googleImg} alt="" />
                    <p className="header__nav-chrome-cta">Download Extension</p>
                </div> */}
                <div className="header__nav-upgrade">
                    <img className="header__nav-upgrade-star-top" src={starLightPurpleImg} alt="" />
                    <img className="header__nav-upgrade-star-bottom" src={startPurple} alt="" />
                    <p className="header__nav-upgrade-cta">Upgrade To Premium</p>
                </div>
                <ProfileDropdown />
            </nav>
        </div>
    );
}
