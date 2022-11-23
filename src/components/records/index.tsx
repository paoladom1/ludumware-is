import * as React from "react";
import { render } from "react-dom";
import { PrintPage } from "./printPage";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <PrintPage />
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
