import "./EditorPage.scss";

// libraries
import React, { useEffect, useState } from "react";

// components
import TextEditorButtons from "../../components/TextEditorButtons/TextEditorButtons";

export default function EditorPage() {
    const [userInput, setUserInput] = useState("");
    const [currentWords, setCurrentWords] = useState(0);
    const [currentCharacters, setCurrentCharacters] = useState(0);

    useEffect(() => {
        setCurrentWords(userInput.split(" ").length - 1);
        setCurrentCharacters(userInput.split("").length);
    }, [userInput]);

    const handleRequest = (event) => {
        if (event.key === "Enter" && userInput.includes("//")) {
            // split the userInput string into an arr of lines
            const lines = userInput.split("\n");

            // find the index of the line that includes "//"
            const lineIndex = lines.findIndex((line) => line.includes("//"));

            if (lineIndex !== -1) {
                // if a matching line is found
                lines.splice(lineIndex, 1); // removes the line from the arr

                // joins the remaining lines back into a single string
                const updatedUserInput = lines.join("\n");

                // update the state with the new userInput string
                setUserInput(updatedUserInput);
            }
        }
    };

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
                <div className="editor-page__nav-placeholder">
                    {/* placeholder to create the same width as the editor and suggestions sections  */}
                </div>
            </nav>
            <div className="editor-page__box">
                <div className="editor-page__box-editor">
                    <textarea
                        className="editor-page__box-editor-input"
                        placeholder="Write or paste text here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleRequest}
                    />
                    <div className="editor-page__box-editor-choose">
                        <div className="editor-page__box-editor-choose-box">
                            <div className="editor-page__box-editor-choose-box-headers">
                                <p>H1</p>
                                <p>H1</p>
                                <p>H1</p>
                                <p>H1</p>
                            </div>
                            <div className="editor-page__box-editor-choose-box-words">
                                <p>
                                    {currentWords} Words ({currentCharacters} Characters)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editor-page__box-suggestions">
                    <span className="editor-page__box-suggestions-data">Your Suggestions</span>
                </div>
            </div>
        </div>
    );
}
