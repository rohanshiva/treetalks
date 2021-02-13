import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/tmp";
import React from "react";

import { BaseProvider } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme } from "baseui";

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Navbar />
        <LandingPage />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
