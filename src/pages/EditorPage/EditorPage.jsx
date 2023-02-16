import "./EditorPage.scss";

// libraries
import React, { useRef, useState } from "react";
import axios from "axios";

// components
import TextEditorButtons from "../../components/TextEditorButtons/TextEditorButtons";

// images
import checkImg from "../../assets/icons/check.svg";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadingMessage from "../../components/LoadingMessage/LoadingMessage";

export default function EditorPage() {
    const [userInput, setUserInput] = useState("");
    const [GPTResponse, setGPTResponse] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const highlightRef = useRef(null);

    const handleGPT = async (event) => {
        const start = highlightRef.current.selectionStart;
        const end = highlightRef.current.selectionEnd;
        const highlightedText = highlightRef.current.value.substring(start, end);

        if (!highlightedText) {
            setErrorMessage(true);

            setTimeout(() => {
                setErrorMessage(false);
            }, 3500);
        } else {
            const newMessage = `${event}: '${highlightedText}'`;

            try {
                setIsLoading(true);

                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/openai`, {
                    message: newMessage,
                });

                setIsLoading(false);

                setGPTResponse(data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleRequest = async (event) => {
        if (event.key === "Enter" && userInput.includes("//")) {
            // split the userInput string into an arr of lines
            const lines = userInput.split("\n");

            // find the index of the line that includes "//"
            const lineIndex = lines.findIndex((line) => line.includes("//"));

            if (lineIndex !== -1) {
                const lineWithComment = lines[lineIndex];
                console.log(lineWithComment);

                // extract the text content of the line, without the '//'
                const prompt = lineWithComment.replace("//", "").trim();

                // call the API with the prompt
                try {
                    setIsLoading(true);

                    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/openai`, {
                        message: prompt,
                    });

                    setIsLoading(false);

                    const responseData = data.map((item) => item);

                    // insert the api response data right below the prompt line
                    const updatedLines = [...lines];

                    updatedLines.splice(lineIndex + 1, 0, "", ...responseData);

                    // join the updated lines back into a single string
                    const updatedUserInput = updatedLines.join("\n");

                    // update the state with the new userInput string
                    setUserInput(updatedUserInput);
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    return (
        <div className="editor-page">
            {isLoading && <LoadingMessage />}
            {errorMessage && <ErrorMessage message="Error! Highlight text to continue..." />}
            <nav className="editor-page__nav">
                <div className="editor-page__nav-width">
                    <TextEditorButtons name="Enhance" handleGPT={handleGPT} />
                    <TextEditorButtons name="Summarise" handleGPT={handleGPT} />
                    <div className="editor-page__nav-width-mood">
                        <TextEditorButtons name="Informal" handleGPT={handleGPT} />
                        <TextEditorButtons name="Formal" handleGPT={handleGPT} />
                    </div>
                    <div className="editor-page__nav-width-length">
                        <TextEditorButtons name="Shorten" handleGPT={handleGPT} />
                        <TextEditorButtons name="Elaborate" handleGPT={handleGPT} />
                    </div>
                </div>
                <div className="editor-page__nav-placeholder">
                    {/* placeholder to create the same width as the editor and suggestions sections  */}
                </div>
            </nav>
            <div className="editor-page__box">
                <div className="editor-page__box-editor">
                    <textarea
                        ref={highlightRef}
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
                                    {userInput.split(" ").length - 1} Words (
                                    {userInput.split("").length} Characters)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editor-page__box-suggestions">
                    <span className="editor-page__box-suggestions-data">Your Recommendations</span>
                    <div className="editor-page__box-suggestions-content">
                        <div className="editor-page__box-suggestions-content-placeholder">
                            <img
                                className="editor-page__box-suggestions-content-placeholder-img"
                                src={checkImg}
                                alt=""
                            />
                            <span className="editor-page__box-suggestions-content-placeholder-header">
                                So far, so good!
                            </span>
                            <p>Now, let’s dive deeper and see what alternatives are available.</p>
                            <p className="editor-page__box-suggestions-content-placeholder-fade">
                                P.S. Use // inline to create a customised prompt, i.e. '// what's
                                the defintion of dog?'
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
