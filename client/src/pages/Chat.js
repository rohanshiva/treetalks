import React from "react";
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {useStyletron} from 'baseui';

export default function Chat() {
const [css, theme] = useStyletron();
const inputRef = React.useRef(null);
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
      username: "sponge",
      createdAt: "12920383",
    },
  ];
  return (
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
    <form className={css({display: 'flex', margin:'4rem 2rem'})}>

    <Input
        inputRef={inputRef}
        placeholder="With input ref"
        overrides={{
          Root: {
            style: {
              width: '50%',
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
