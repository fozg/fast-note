import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Main from "./App";
import { createGlobalStyle } from "styled-components";
import { MessnoteState } from "./context/MessnoteContext";
import Auth from "./auth";

const GlobalStyled = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #1c1c1c;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  
  * {
    box-sizing: border-box;
  }

  [contenteditable=true]:empty:before {
    content: attr(placeholder);
    display: block; /* For Firefox */
    color: #ccc;
  }
`;

function App() {
  const [isAuthenting, setIsAuthenting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, isAuthenting);

  const checkAuth = async () => {
    await Auth.authenUrlCallback(() => {
      setIsAuthenting(true);
    });
    setIsAuthenting(false);
  };

  return isAuthenting ? (
    "Loading..."
  ) : (
    <MessnoteState>
      <GlobalStyled />
      <Main />
    </MessnoteState>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
