import "./ProfileDropdown.scss";

// libraries
import React, { useState } from "react";

// images
import triangleImg from "../../assets/icons/triangle.png";
import profileImg from "../../assets/images/portrait.jpg";

export default function ProfileDropdown() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="profile-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
            <nav className="profile-dropdown__nav">
                <img className="profile-dropdown__nav-img" src={profileImg} alt="" />
                <p className="profile-dropdown__nav-name">Timo</p>
                <img className="profile-dropdown__nav-triangle" src={triangleImg} alt="" />
            </nav>
            {showDropdown && (
                <ul className="profile-dropdown__list">
                    <div className="profile-dropdown__list-name">
                        <li className="profile-hover">Timo Huennebeck</li>
                        <div className="profile-dropdown__list-name-plan profile-hover">
                            <li>Free Plan</li>
                            <li className="profile-dropdown__list-name-plan-upgrade">Upgrade</li>
                        </div>
                    </div>
                    <div className="profile-dropdown__list-settings">
                        <li className="profile-hover">Settings</li>
                        <li className="profile-hover">Contact Us</li>
                        <li className="profile-hover">Log Out</li>
                    </div>
                </ul>
            )}
        </div>
    );
}
