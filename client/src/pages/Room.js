import React, {useEffect, useRef, useState} from 'react'
import { useLocation } from 'react-router-dom';
import {useSocket} from 'use-socketio';
import { validateRoom } from "../apis/Room";
import { useStyletron } from "baseui";

import firebase from "firebase/app";

import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";


import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import mic from "../images/mic.svg";
import micOff from "../images/mic-off.svg";
import { Avatar } from "baseui/avatar";
import "./styles.css";

const getRoomId = (path) => {
  return path.substring(1, path.length);
}

export default function Room(props) {
  const { socket } = useSocket("join");
  const location = useLocation();
  const topic = location.state.params;
  const [user] = useAuthState(firebase.auth());
  const roomID = getRoomId(props.location.pathname);
  const [css, theme] = useStyletron();
  const [player1Mute, setPlayer1Mute] = useState(true);
  const [player2Mute, setPlayer2Mute] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {


    const leaveRoom = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", () => leaveRoom());
    const roomOptions = {
      roomId: roomID,
      userId: user.displayName,
      topicDetails: {
        title: topic.topicName,
        description: topic.topicDetails,
      },
      degree: 1,
    };

    socket.emit("join", roomOptions);

    return () => {
      window.removeEventListener("beforeunload", () => leaveRoom());
    };
  }, [roomID, socket]);

  const toggleMute = (player) => {
    if (player == "player1") {
      if (player1Mute) {
        setPlayer1Mute(false);
      } else {
        setPlayer1Mute(true);
      }
    } else {
      if (player2Mute) {
        setPlayer2Mute(false);
      } else {
        setPlayer2Mute(true);
      }
    }
  };

  const messages = [
    {
      id: "sponge",
      text: "Cut the coupe",
      username: "sponge",
      createdAt: "12920383",
    },
    {
      id: "sponge",
      text: "Cut the coupe",
      username: "sponge",
      createdAt: "12920383",
    },
    {
      id: "sponge",
      text: "Cut the coupe",
      username: "sponge",
      createdAt: "12920383",
    },
    {
      id: "sponge",
      text: "Cut the coupe",
      username: "Bombshell",
      createdAt: "12920383",
    },
  ];

  const itemProps = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onMessageSubmit = e => {
    e.preventDefault()
    socket.emit("chatMessage", {
      text: message,
      authorId: user.displayName
  });
  }

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>

    <FlexGrid
      flexGridColumnCount={2}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      <FlexGridItem {...itemProps}>
        <Card
          overrides={{
            Root: { style: { width: "400px", margin: "5rem" } },
          }}
          title={`Let's talk about ${topic.topicName}!`}
        >
          <StyledBody>
            Create a private room to debate with your friends on any topic.
          </StyledBody>

          <StyledBody>
            <ListItem>
              <ListItemLabel>Player One (You)</ListItemLabel>
              <ListItemLabel>
                <img
                  src={player1Mute ? micOff : mic}
                  onClick={() => toggleMute("player1")}
                ></img>
              </ListItemLabel>
            </ListItem>
            <ListItem>
              <ListItemLabel>Player Two</ListItemLabel>
              <ListItemLabel>
                <img
                  src={player2Mute ? micOff : mic}
                  onClick={() => toggleMute("player2")}
                ></img>
              </ListItemLabel>
            </ListItem>
          </StyledBody>

          <StyledAction>
            <Button overrides={{ BaseButton: { style: { width: "100%" } } }}>
              End Chat
            </Button>
          </StyledAction>
        </Card>
      </FlexGridItem>
      <FlexGridItem>
        <div>
          <div
            style={{
              margin: "4rem 2rem",
              padding: "10px",
              height: "40vh",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
          </div>
          <form
            onSubmit={onMessageSubmit}
            className={css({ display: "flex", margin: "4rem 2rem" })}
          >
            <Input
              name="message"
              onChange={(e) => onTextChange(e)}
              value={message}
              overrides={{
                Root: {
                  style: {
                    width: "70%",
                    marginRight: theme.sizing.scale400,
                  },
                },
              }}
            />
            <Button>Send</Button>
          </form>
        </div>
      </FlexGridItem>
    </FlexGrid>
  </div>
  );
}


function ChatMessage(props) {
  const { text, username, createdAt } = props.message;
  return (
    <>
      <div className={`message`}>
        <h4>{username}</h4>
        <p>{text}</p>
      </div>
    </>
  );
}

const Divider = () => {
  return (
    <div className="container">
      <div className="border" />
    </div>
  );
};
