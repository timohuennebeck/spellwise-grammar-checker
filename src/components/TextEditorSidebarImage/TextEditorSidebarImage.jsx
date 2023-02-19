import "./TextEditorSidebarImage.scss";

// libraries
import React, { useState } from "react";

// icons
import { ReactComponent as ClipboardImg } from "../../assets/icons/clipboard.svg";
import { ReactComponent as GrammarImg } from "../../assets/icons/grammar.svg";
import { ReactComponent as SuggestionsImg } from "../../assets/icons/ai.svg";

export default function TextEditorSidebarImage({ name, onClick }) {
    const [hover, setHover] = useState(false);

    let sidebarItem;

    // switch statement to determine which icon to show
    switch (name) {
        case "Clipboard":
            sidebarItem = <ClipboardImg className="sidebar__box-svg" />;
            break;
        case "Grammar":
            sidebarItem = <GrammarImg className="sidebar__box-svg" />;
            break;
        case "Suggestions":
            sidebarItem = <SuggestionsImg className="sidebar__box-svg" />;
            break;
    }

    return (
        <>
            <div
                className="sidebar"
                onClick={() => onClick()}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="sidebar__box">{sidebarItem}</div>
                {hover && (
                    <div className="sidebar__hover">
                        <p className="sidebar__hover-indv">{name}</p>
                    </div>
                )}
            </div>
        </>
    );
}
