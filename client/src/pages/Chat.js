import React, {useState} from "react";
import { Input } from "baseui/input";
import { Button, KIND} from "baseui/button";
import { useStyletron } from "baseui";

import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { ListItem, ListItemLabel } from "baseui/list";
import Upload from "baseui/icon/upload";
import mic from "../images/mic.svg";
import micOff from "../images/mic-off.svg";

import { Avatar } from "baseui/avatar";
import "./styles.css";

import TweetModal from "../components/TweetModal";

export default function Chat() {
  const [css, theme] = useStyletron();
  const inputRef = React.useRef(null);

  const [player1Mute, setPlayer1Mute] = useState(true);
  const [player2Mute, setPlayer2Mute] = useState(true);
  const [showTweetModal, setShowTweetModal] = useState(false);

  const toggleMute = (player) =>{
    if(player == "player1"){
      if(player1Mute){
        setPlayer1Mute(false);
      }
      else{
        setPlayer1Mute(true);
      }
    }
    else{
      if(player2Mute){
        setPlayer2Mute(false);
      }
      else{
        setPlayer2Mute(true);
      }
    }
  }

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
          title="Let's Talk About Climate Change!"
        >
          <StyledBody>
            Create a private room to debate with your friends on any topic.
          </StyledBody>

          <StyledBody>
            <ListItem>
              <ListItemLabel>Player One (You)</ListItemLabel>
              <ListItemLabel>
                <img src={player1Mute ? (micOff) : (mic)} onClick={() => toggleMute("player1")}>
                </img>
              </ListItemLabel>
            </ListItem>
            <ListItem>
              <ListItemLabel>Player Two</ListItemLabel>
              <ListItemLabel>
                <img src={player2Mute ? (micOff) : (mic)} onClick={() => toggleMute("player2")}>
                </img>
              </ListItemLabel>
            </ListItem>
          </StyledBody>

          <StyledAction>
            <Button overrides={{ BaseButton: { style: { width: "100%" } } }} onClick={() => setShowTweetModal(true)} >
              End Discussion
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
      {showTweetModal ? (<TweetModal  isOpen={true}  onClose={() => setShowTweetModal(false)} />) : (null)}
    </FlexGrid>
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
