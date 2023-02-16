import "./LoggedInInterface.scss";

// libraries
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function LoggedInInterface() {
    return (
        <div className="logged-in">
            <Header />
            <div className="logged-in__outlet">
                <Outlet />
            </div>
        </div>
    );
}
