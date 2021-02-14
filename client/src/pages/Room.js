import React, { useState, useEffect } from "react";

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
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import io from "socket.io-client";
import "./styles.css";
import moment from "moment";


const socket = io.connect("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected!");
})

const getRoomId = (path) => {
  return path.substring(1, path.length);
}

export default function Room(props) {
  const [user] = useAuthState(firebase.auth());
  const roomID = getRoomId(props.location.pathname);
  const [valid, setValid] = useState(true);
  const [messages, setMessages] = useState([])
  const [css, theme] = useStyletron();
  const [text, setText] = useState("");
  const [player1Mute, setPlayer1Mute] = useState(true);
  const [player2Mute, setPlayer2Mute] = useState(true);

  useEffect(() => {
    
    const leaveRoom = () => {
      socket.disconnect();
    }

    const roomOptions = {
      roomId: roomID,
      userId: "Ramko9999",
      topicDetails: {
        title: "World Eater",
        description: "They are nice",
      },
      degree: 1,
    };
    
    socket.emit("join", roomOptions);

    socket.on("room", (data) => {
      const room = JSON.parse(data);
      setMessages(room.chatHistory);
    });
    
    return () => {
      leaveRoom();
    };
    
  }, []);

  const onMessageSubmit = e => {
    e.preventDefault();
    if(text.length > 0){
      socket.emit("chatMessage", {
        authorId: "Ramko9999",
        text: text
      });
      setText("");
    }
  }

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

  const itemProps = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };



  return (
    <div>
      {valid ? null : (
        <Notification kind="negative">Negative notification</Notification>
      )}
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
            title={`Let's talk about ${props.topicName}!`}
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
              {messages.map(({authorId, text, createdAt, id}, idx) => (
                <ChatMessage key={id} message={text} username={authorId} createdAt={createdAt} />
              ))}
            </div>
            <form
              onSubmit={onMessageSubmit}
              className={css({ display: "flex", margin: "4rem 2rem" })}
            >
              <Input
                name="message"
                onChange={(e) => onTextChange(e)}
                value={text}
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

function convertTime(hours, minutes) {
  var isAm = true;
  var h = hours;
  if (hours >= 12) {
      isAm = false;
      h -= 12;
  }
  if (h === 0) {
      h += 12;
  }
  var ending = isAm ? "AM" : "PM";
  var min = `0${minutes}`
  if (minutes >= 10) {
      min = `${minutes}`;
  }
  return `${h}:${min} ${ending}`;
}


function convertToLocal(time) {
  /**
   * @param time: UTC Moment.js Time string;
   */

  var months = ["January","Feburary","March","April","May","June","July","August",
      "September", "October", "November", "December"];
  var otherTime = moment(time).local();
  var now = moment().local();
  if (otherTime.dayOfYear() === now.dayOfYear()) {
      return `Today ${convertTime(otherTime.hours(), otherTime.minutes())}`;
  }
  var diff = now.date() - otherTime.date();
  if (diff < 2) {
      return `Yesterday ${convertTime(otherTime.hours(), otherTime.minutes())}`;
  } else {
      return `${months[otherTime.month()]} ${otherTime.date()}, ${otherTime.year()} ${convertTime(otherTime.hours(), otherTime.minutes())}`
  }

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
