import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import React from "react";
import Home from './pages/Home'
import Room from './pages/Room'

import { BaseProvider } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme, DarkTheme } from "baseui";

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Navbar />
        <Home/>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
