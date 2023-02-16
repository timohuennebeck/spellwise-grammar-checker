import "./EditorPage.scss";

// libraries
import React, { useState } from "react";

// components
import TextEditorButtons from "../../components/TextEditorButtons/TextEditorButtons";

export default function EditorPage() {
    const [userInput, setUserInput] = useState("");

    return (
        <div className="editor-page">
            <nav className="editor-page__nav">
                <div className="editor-page__nav-width">
                    <TextEditorButtons name="Enhance" />
                    <div className="editor-page__nav-width-mood">
                        <TextEditorButtons name="Informal" />
                        <TextEditorButtons name="Formal" />
                    </div>
                    <div className="editor-page__nav-width-length">
                        <TextEditorButtons name="Shorten" />
                        <TextEditorButtons name="Expand" />
                    </div>
                </div>
                <div className="editor-page__nav-placeholder"></div>
            </nav>
            <div className="editor-page__box">
                <div className="editor-page__box-editor">
                    <textarea
                        className="editor-page__box-editor-input"
                        placeholder="Write or paste text here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <div className="editor-page__box-editor-choose">
                        <div className="editor-page__box-editor-choose-headers">
                            <p>H1</p>
                            <p>H1</p>
                            <p>H1</p>
                            <p>H1</p>
                        </div>
                        <div className="editor-page__box-editor-choose-words">
                            <p>Words</p>
                        </div>
                    </div>
                </div>
                <div className="editor-page__box-suggestions">
                    <div className="editor-page__box-suggestions-data">123</div>
                </div>
            </div>
        </div>
    );
}
