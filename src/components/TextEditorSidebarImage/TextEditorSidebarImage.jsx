import "./TextEditorSidebarImage.scss";

// libraries
import React from "react";

// icons
import { ReactComponent as ClipboardImg } from "../../assets/icons/clipboard.svg";
import { ReactComponent as GrammarImg } from "../../assets/icons/grammar.svg";
import { ReactComponent as SuggestionsImg } from "../../assets/icons/ai.svg";

export default function TextEditorSidebarImage({ name, onClick }) {
    let sidebarItem;

    switch (name) {
        case "clipboard":
            sidebarItem = <ClipboardImg className="sidebar__svg" />;
            break;
        case "grammar":
            sidebarItem = <GrammarImg className="sidebar__svg" />;
            break;
        case "suggestions":
            sidebarItem = <SuggestionsImg className="sidebar__svg" />;
            break;
    }

    return (
        <div className="sidebar" onClick={() => onClick()}>
            {sidebarItem}
        </div>
    );
}
