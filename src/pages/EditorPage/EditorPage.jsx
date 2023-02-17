import "./EditorPage.scss";

// libraries
import React, { useRef, useState } from "react";
import axios from "axios";

// components
import TextEditorButtons from "../../components/TextEditorButtons/TextEditorButtons";

// images
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadingMessage from "../../components/LoadingMessage/LoadingMessage";
import TextEditorSidebarImage from "../../components/TextEditorSidebarImage/TextEditorSidebarImage";
import Iterations from "../../components/Iterations/Iterations";
import GeneratedRecommendations from "../../components/GeneratedRecommendations/GeneratedRecommendations";
import GeneratedGrammar from "../../components/GeneratedGrammar/GeneratedGrammar";
import { ReactComponent as UnderlineImg } from "../../assets/icons/text-underline.svg";
import { ReactComponent as HeadersImg } from "../../assets/icons/headers.svg";
import { ReactComponent as BoldImg } from "../../assets/icons/text-bold.svg";
import { ReactComponent as ItalicImg } from "../../assets/icons/text-italic.svg";

export default function EditorPage() {
    const [userInput, setUserInput] = useState("");
    const [GPTResponse, setGPTResponse] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [revealContent, setRevealContent] = useState(false);
    const [iterations, setIterations] = useState(1);

    const highlightRef = useRef(null);

    const handleGPT = async (event) => {
        const start = highlightRef.current.selectionStart;
        const end = highlightRef.current.selectionEnd;
        const highlightedText = highlightRef.current.value.substring(start, end);

        console.log(iterations);

        if (!highlightedText) {
            setErrorMessage(true);

            setTimeout(() => {
                setErrorMessage(false);
            }, 3500);
        } else {
            const message = `${event}: '${highlightedText}'`;

            try {
                setIsLoading(true);

                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/openai`, {
                    prompt: message,
                    n: iterations,
                });

                setIsLoading(false);
                setRevealContent(true);

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

                // extract the text content of the line, without the '//'
                const prompt = lineWithComment.replace("//", "").trim();

                // call the API with the prompt
                try {
                    setIsLoading(true);

                    const { data } = await axios.post(
                        `${process.env.REACT_APP_API_URL}/openai-slash`,
                        {
                            prompt: prompt,
                        }
                    );

                    setIsLoading(false);

                    // remove the "//" line from the lines array
                    const updatedLines = [...lines];
                    updatedLines.splice(lineIndex, 1);

                    // add the GPT response as a new line after the "//" line
                    updatedLines.splice(lineIndex, 0, data);

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
                    <div className="editor-page__box-editor-input">
                        <textarea
                            ref={highlightRef}
                            className="editor-page__box-editor-input-textarea"
                            placeholder="Write or paste text here..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleRequest}
                        />
                        <div className="editor-page__box-editor-input-items">
                            <TextEditorSidebarImage
                                name="Clipboard"
                                onClick={() => navigator.clipboard.writeText(userInput)}
                            />
                            <TextEditorSidebarImage
                                name={revealContent ? "Grammar" : "Suggestions"}
                                onClick={() => setRevealContent(!revealContent)}
                            />
                            {revealContent && (
                                <Iterations iterations={iterations} setIterations={setIterations} />
                            )}
                        </div>
                    </div>
                    <div className="editor-page__box-editor-choose">
                        <div className="editor-page__box-editor-choose-box">
                            <div className="editor-page__box-editor-choose-box-headers">
                                <HeadersImg className="editor-page__box-editor-choose-box-headers-indv" />
                                <UnderlineImg className="editor-page__box-editor-choose-box-headers-indv" />
                                <BoldImg className="editor-page__box-editor-choose-box-headers-indv" />
                                <ItalicImg className="editor-page__box-editor-choose-box-headers-indv" />
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
                    <span className="editor-page__box-suggestions-data">
                        {revealContent ? "Your Suggestions" : "Grammar Corrections"}
                    </span>
                    {revealContent ? (
                        <GeneratedRecommendations GPTResponse={GPTResponse} />
                    ) : (
                        <GeneratedGrammar />
                    )}
                </div>
            </div>
        </div>
    );
}
