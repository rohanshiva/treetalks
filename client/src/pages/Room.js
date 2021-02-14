import React, { useState, useEffect } from "react";
import { useSocket } from "use-socketio";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { useStyletron } from "baseui";
import { Notification } from "baseui/notification";

import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import mic from "../images/mic.svg";
import micOff from "../images/mic-off.svg";
import { validateRoom } from "../apis/Room";
import history from "../History";
import "./styles.css";



const handleJoin = (socket, room, id, {title, description}, degree) => {
  socket.emit("join",{
    roomId: room,
    id: id,
    topicDetails: {
      title: title,
      description: description
    }
  });
}

export default function Room(props) {
  const roomID = props.location.pathname;
  const { socket } = useSocket("connect");
  const [valid, setValid] = useState(true);

  useEffect(() => {
    const leaveRoom = () => {
      socket.disconnect();
    };

    window.addEventListener("beforeunload", () => leaveRoom());

    validateRoom(roomID).then((isValid) => {
      if (isValid) {
  
        socket.emit("join", {
          roomId: roomID,
          userId: "Ramko9999",
          topicDetails: {
            title: props.topic,
            description: props.topic,
          },
          degree: 1,
        });
      } else {
        setValid(false);
      }
    });

    return () => {
      window.removeEventListener("beforeunload", () => leaveRoom());
    };
  }, [roomID, socket]);

  const [css, theme] = useStyletron();
  const inputRef = React.useRef(null);

  const [player1Mute, setPlayer1Mute] = useState(true);
  const [player2Mute, setPlayer2Mute] = useState(true);

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

  return (
    <div>
      {valid ? (
       null
      ) :  <Notification kind="negative">Negative notification</Notification>}
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
            title= {`Let's talk about ${props.topicName}!`}
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
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>
            <form className={css({ display: "flex", margin: "4rem 2rem" })}>
              <Input
                inputRef={inputRef}
                placeholder="With input ref"
                overrides={{
                  Root: {
                    style: {
                      width: "70%",
                      marginRight: theme.sizing.scale400,
                    },
                  },
                }}
              />
              <Button
                onClick={() => inputRef.current && inputRef.current.focus()}
              >
                Send
              </Button>
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
