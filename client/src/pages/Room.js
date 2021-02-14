import React, { useEffect, useContext, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "use-socketio";
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
import "./styles.css";
import moment from "moment";
import { SocketContext } from "../context/SocketContext";

import TweetModal from "../components/TweetModal";

const getRoomId = (path) => {
  return path.substring(1, path.length);
};

export default function Room(props) {
  const { socket, isSocketConnected } = useContext(SocketContext);
  const location = useLocation();

  const [topicDetails, setTopicDetails] = useState(
    location.state ? location.state.params : {}
  );

  const [user] = useAuthState(firebase.auth());

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [css, theme] = useStyletron();
  const [speakers, setSpeakers] = useState([]);

  const [showTweetModal, setShowTweetModal] = useState(false);

  const dummy = useRef();

  useEffect(() => {
    let leaveRoom = () => {};
    if (isSocketConnected) {
      leaveRoom = () => {
        console.log("Leaving...");
        socket.emit("leave", () => {});
      };

      window.onunload = leaveRoom;
      window.onpopstate = leaveRoom;

      let isCustom = false;
      let degree = 50;
      if (location.state) {
        isCustom = location.state.isCustom;
        degree = location.state.degree;
      }

      const options = {
        roomId: getRoomId(props.location.pathname),
        userId: user.uid,
        topicDetails: topicDetails,
        degree: degree,
        isCustom: isCustom,
      };

      socket.emit("join", options);

      socket.on("room", (data) => {
        const room = JSON.parse(data);
        setTopicDetails(room.topicDetails);
        setMessages(room.chatHistory);
        setSpeakers(room.speakers);
        dummy.current.scrollIntoView({ behavior: "smooth" });
      });
    }
    return () => {
      leaveRoom();
    };
  }, [isSocketConnected]);

  const toggleMute = (id) => {
    socket.emit("mute", { id: id });
  };

  const getPlayerTile = ({ id, anonUsername, isMuted }) => {
    let fakeName = anonUsername;
    if (id === user.uid) {
      fakeName += ` (You)`;
    }

    return (
      <div key={id}>
        <ListItem>
          <ListItemLabel>{fakeName}</ListItemLabel>
          <ListItemLabel>
            <div className="clickable">
              <img
                src={isMuted ? micOff : mic}
                onClick={() => {
                  if (id === user.uid) {
                    toggleMute(id);
                  }
                }}
              ></img>
            </div>
          </ListItemLabel>
        </ListItem>
      </div>
    );
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (text.length > 0) {
      socket.emit("chatMessage", {
        authorId: user.uid,
        text: text,
      });
      setText("");
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
            title={`Let's talk about ${
              topicDetails ? topicDetails.title : "_______"
            }!`}
          >
            <StyledBody>
              Create a private room to debate with your friends on any topic.
            </StyledBody>

            <StyledBody>{speakers.map(getPlayerTile)}</StyledBody>

            <StyledAction>
              {/* <Button overrides={{ BaseButton: { style: { width: "100%" } } }} onClick={() => {
                socket.emit("leave", () => { });
                window.history.back();
              }}>
                End Chat
            </Button> */}
              <Button
                overrides={{ BaseButton: { style: { width: "100%" } } }}
                onClick={() => setShowTweetModal(true)}
              >
                End Discussion
              </Button>
            </StyledAction>
          </Card>
        </FlexGridItem>
        <FlexGridItem>
          <div style={{ marginRight: "20%", marginTop: "10%" }}>
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
              {messages.map(
                ({ authorId, text, anonUsername, createdAt, id }, idx) => (
                  <ChatMessage
                    key={id}
                    text={text}
                    idx={idx}
                    username={anonUsername}
                    createdAt={createdAt}
                    idx={idx}
                  />
                )
              )}
              <div ref={dummy}></div>
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
                      width: "100%",
                      marginRight: theme.sizing.scale400,
                    },
                  },
                }}
              />
              <Button>Send</Button>
            </form>
          </div>
        </FlexGridItem>
        {showTweetModal ? (
          <TweetModal
            isOpen={true}
            topicName={topicDetails.title}
            onClose={() => setShowTweetModal(false)}
            onEnd={() => {
              socket.emit("leave", () => {});
              window.history.back();
            }}
          />
        ) : null}
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
  var min = `0${minutes}`;
  if (minutes >= 10) {
    min = `${minutes}`;
  }
  return `${h}:${min} ${ending}`;
}

function convertToLocal(time) {
  /**
   * @param time: UTC Moment.js Time string;
   */

  var months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var otherTime = moment(time).local();
  var now = moment().local();
  if (otherTime.dayOfYear() === now.dayOfYear()) {
    return `Today ${convertTime(otherTime.hours(), otherTime.minutes())}`;
  }
  var diff = now.date() - otherTime.date();
  if (diff < 2) {
    return `Yesterday ${convertTime(otherTime.hours(), otherTime.minutes())}`;
  } else {
    return `${
      months[otherTime.month()]
    } ${otherTime.date()}, ${otherTime.year()} ${convertTime(
      otherTime.hours(),
      otherTime.minutes()
    )}`;
  }
}

function ChatMessage(props) {
  const { text, username, createdAt, idx } = props;

  if (idx % 2 === 0) {
    return (
      <>
        <div className={`message`} style={{ background: "mono500" }}>
          <span style={{ float: "left", margin: "0% 0% 0% 2%" }}>
            <h3> {username} </h3>
            <p style={{}}> {text} </p>
          </span>
          <span style={{ float: "right", margin: "0% 2% 0% 0%" }}>
            <p> {convertToLocal(createdAt)} </p>
          </span>
        </div>
        <div style={{ borderBottom: "1px black" }}></div>
      </>
    );
  } else {
    return (
      <>
        <div className={`message`} style={{ border: ".25px solid grey" }}>
          <span style={{ float: "left", margin: "0% 0% 0% 2%" }}>
            <h3> {username} </h3>
            <p style={{}}> {text} </p>
          </span>
          <span style={{ float: "right", margin: "0% 2% 0% 0%" }}>
            <p> {convertToLocal(createdAt)} </p>
          </span>
        </div>
        <div style={{ borderBottom: "1px black" }}></div>
      </>
    );
  }
}
