import "./EditorPage.scss";

// libraries
import React, { useEffect, useRef, useState } from "react";
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
import LanguageDropdown from "../../components/LanguageDropdown/LanguageDropdown";
import LoadingGrammar from "../../components/LoadingGrammar/LoadingGrammar";

export default function EditorPage() {
    const [userInput, setUserInput] = useState("");
    const [GPTResponse, setGPTResponse] = useState([]);
    const [toggleError, setToggleError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error!");
    const [isLoading, setIsLoading] = useState(false);
    const [revealContent, setRevealContent] = useState(false);
    const [iterations, setIterations] = useState(1);
    const [lastSentence, setLastSentence] = useState("");
    const [grammarErrors, setGrammarErrors] = useState([]);
    const [loadingGrammar, setLoadingGrammar] = useState(false);

    const highlightRef = useRef(null);

    // Add an event listener to the text area to detect when the user finishes writing a sentence
    useEffect(() => {
        const handleKeyUp = (event) => {
            // Check if the key pressed is a period, exclamation point, or question mark
            if (event.key === "." || event.key === "!" || event.key === "?") {
                // Get the text in the text area
                const text = highlightRef.current.value;

                // Get the last sentence in the text
                const sentences = text.split(/(?<=[.?!])\s+/);
                const last = sentences[sentences.length - 1];

                // Check if the last sentence is different from the previous one
                if (last !== lastSentence) {
                    setLastSentence(last);
                }
            }
        };

        const element = highlightRef.current;

        if (element) {
            element.addEventListener("keyup", handleKeyUp);

            return () => {
                element.removeEventListener("keyup", handleKeyUp);
            };
        }
    }, [lastSentence]);

    // Check the grammar of the last sentence when it changes
    useEffect(() => {
        if (lastSentence) {
            axios
                .post(`${process.env.REACT_APP_API_URL}/openai-edit`, {
                    prompt: lastSentence,
                })
                .then((response) => {
                    setGrammarErrors([...grammarErrors, [response.data]]);
                })
                .catch(() => {
                    setIsLoading(false);
                    setErrorMessage(
                        "There has been an error on our side. Please, come back later."
                    );
                    setToggleError(true);

                    setTimeout(() => {
                        setToggleError(false);
                    }, 2500);
                });
        }
    }, [lastSentence]);

    const handleGrammar = () => {
        // find the start and end points of the highlighted data
        const start = highlightRef.current.selectionStart;
        const end = highlightRef.current.selectionEnd;
        const highlightedText = highlightRef.current.value.substring(start, end);

        if (!highlightedText) {
            setErrorMessage("Error! Higlight some text to continue.");
            setToggleError(true);

            setTimeout(() => {
                setToggleError(false);
            }, 3500);
        } else {
            setLoadingGrammar(true);

            axios
                .post(`${process.env.REACT_APP_API_URL}/openai-edit`, {
                    prompt: userInput,
                })
                .then((response) => {
                    console.log(response.data);
                    setLoadingGrammar(false);
                    setGrammarErrors([...grammarErrors, [response.data]]);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setErrorMessage(
                        "There has been an error on our side. Please, come back later."
                    );
                    setToggleError(true);

                    setTimeout(() => {
                        setToggleError(false);
                    }, 2500);
                });
        }
    };

    const handleGPT = async (event) => {
        // find the start and end points of the highlighted data
        const start = highlightRef.current.selectionStart;
        const end = highlightRef.current.selectionEnd;
        const highlightedText = highlightRef.current.value.substring(start, end);

        if (!highlightedText) {
            setErrorMessage("Error! Higlight some text to continue.");
            setToggleError(true);

            setTimeout(() => {
                setToggleError(false);
            }, 3500);
        } else {
            const message = `${event}: '${highlightedText}'`;

            try {
                setIsLoading(true);

                // prompt is the request that will be made and n the amount of items we will get back
                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/openai`, {
                    prompt: message,
                    n: iterations,
                });

                setIsLoading(false);

                // shows either the grammar corrections or suggestions page
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
                } catch {
                    setIsLoading(false);
                    setErrorMessage(
                        "There has been an error on our side. Please, come back later."
                    );
                    setToggleError(true);

                    setTimeout(() => {
                        setToggleError(false);
                    }, 3500);
                }
            }
        }
    };

    const handleDeepL = async (languageCode) => {
        const start = highlightRef.current.selectionStart;
        const end = highlightRef.current.selectionEnd;

        try {
            // replace line breaks with a unique separator string
            const separator = "SEPARATOR_STRING";
            const originalText = highlightRef.current.value.replace(/\n/g, separator);

            const { data } = await axios.get(
                `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${originalText}&target_lang=${languageCode}`
            );

            // replace the separator string with line breaks in the translated text
            const translatedText = data.translations[0].text.replace(
                new RegExp(separator, "g"),
                "\n"
            );

            // combine the translated text with the rest of the original text
            const newText =
                highlightRef.current.value.slice(0, start) +
                translatedText +
                highlightRef.current.value.slice(end);

            // update the textarea value
            setUserInput(newText);
        } catch {
            setIsLoading(false);
            setErrorMessage("There has been an error on our side. Please, come back later.");
            setToggleError(true);

            setTimeout(() => {
                setToggleError(false);
            }, 3500);
        }
    };

    return (
        <div className="editor-page">
            {isLoading && <LoadingMessage />}
            {toggleError && <ErrorMessage message={errorMessage} />}
            {loadingGrammar && <LoadingGrammar />}
            <nav className="editor-page__nav">
                <div className="editor-page__nav-width">
                    <TextEditorButtons name="Fix Grammar" handleGrammar={handleGrammar} />
                    <TextEditorButtons name="Rephrase" handleGPT={handleGPT} />
                    <TextEditorButtons name="Summarise" handleGPT={handleGPT} />
                    <div className="editor-page__nav-width-mood">
                        <TextEditorButtons name="Informal" handleGPT={handleGPT} />
                        <TextEditorButtons name="Formal" handleGPT={handleGPT} />
                    </div>
                    <div className="editor-page__nav-width-length">
                        <TextEditorButtons name="Shorten" handleGPT={handleGPT} />
                        <TextEditorButtons name="Expand" handleGPT={handleGPT} />
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
                            <LanguageDropdown handleDeepL={handleDeepL} />
                            {revealContent && (
                                <Iterations iterations={iterations} setIterations={setIterations} />
                            )}
                        </div>
                    </div>
                    <div className="editor-page__box-editor-choose">
                        <div className="editor-page__box-editor-choose-box">
                            {/* <div className="editor-page__box-editor-choose-box-headers">
                                <HeadersImg className="editor-page__box-editor-choose-box-headers-indv" />
                                <UnderlineImg className="editor-page__box-editor-choose-box-headers-indv" />
                                <BoldImg className="editor-page__box-editor-choose-box-headers-indv" />
                                <ItalicImg className="editor-page__box-editor-choose-box-headers-indv" />
                            </div> */}
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
                        <GeneratedGrammar grammarErrors={grammarErrors} />
                    )}
                </div>
            </div>
        </div>
    );
}
