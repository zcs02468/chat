import React from "react";
import "./App.css";
import AppRouter from "./router/index";
import Effect from "./components/effect/index";

function App() {
    return (
        <div className="App">
            <AppRouter />
            <Effect />
        </div>
    );
}

export default App;
