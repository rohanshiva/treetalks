import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Room from "./pages/Room";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SocketIOProvider } from "use-socketio";

import { BaseProvider } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme } from "baseui";

import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SocketState from "./context/SocketContext";


var firebaseConfig = {
  apiKey: "AIzaSyAKGg3SA1dseQKEL-xRreH-b1PE5SBb9rA",
  authDomain: "treetalks-eec9f.firebaseapp.com",
  projectId: "treetalks-eec9f",
  storageBucket: "treetalks-eec9f.appspot.com",
  messagingSenderId: "901045033848",
  appId: "1:901045033848:web:ab0d49b56f8b50fe59868d",
  measurementId: "G-P81VNEX9CC",
};

firebase.initializeApp(firebaseConfig);

const engine = new Styletron();
function App() {
  const [user] = useAuthState(firebase.auth());

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Navbar />
        {user ? (
      
            <Switch>
              <Route exact path="/" component={Home} />
              <SocketState
                url="http://localhost:5000"
              >
                <Route exact path="/:roomId" component={Room} />
              </SocketState>
            </Switch>

        ) : (
          <LandingPage />
        )}
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
