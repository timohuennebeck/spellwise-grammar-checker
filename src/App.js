import "./styles/App.scss";

// components

// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditorPage from "./pages/EditorPage/EditorPage";
import LoggedInInterface from "./interfaces/LoggedInInterface/LoggedInInterface";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<LoggedInInterface />}>
                        <Route path="/" element={<EditorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
