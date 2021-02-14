import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import "firebase/auth";
import { Button, SHAPE, KIND } from "baseui/button";

import { Slider } from "baseui/slider";
import { useStyletron } from "baseui";
import {findRoom, createRoom} from "../apis/Room";
import { useHistory } from "react-router-dom";

export default function JoinModal({ isOpen, onClose, topic}) {
  const history = useHistory();
  const [value, setValue] = React.useState([99]);
  const [css, theme] = useStyletron();

  const handleJoin = async () => {
    const room = await createRoom(); 
    history.push(`/${room}`, {params: topic, isCustom: false, degree:value[0]})
  };

  const getRoom = async () => {
    try{
      const room = await findRoom(topic.title, value);
      history.push(`/${room}`);
    }catch(error){
      await handleJoin();
    }
  }
  
  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Join debate</ModalHeader>
      <ModalBody>
        {topic.question}
        <div>
          <Slider
            value={value}
            min={0}
            max={99}
            step={1}
            onChange={(params) => {
              if (params.value) {
                setValue(params.value);
              } else {
                setValue([]);
              }
            }}
            overrides={{
              Root: {
                style: {
                  marginTop: "24px",
                },
              },
              InnerThumb: () => null,
              ThumbValue: ({ $value }) => (
                <div
                  className={css({
                    position: "absolute",
                    top: `-${theme.sizing.scale800}`,
                    ...theme.typography.font200,
                    backgroundColor: "transparent",
                  })}
                ></div>
              ),
              TickBar: ({ $min, $max }) => (
                <div
                  className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: theme.sizing.scale600,
                    paddingLeft: theme.sizing.scale600,
                    paddingBottom: theme.sizing.scale400,
                  })}
                >
                  <h3>For</h3>
                  <h3>Against</h3>
                </div>
              ),
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose} kind={KIND.minimal}>
          Cancel
        </ModalButton>
        <ModalButton kind={KIND.minimal} onClick={async () => {
          await getRoom();
        }}>Join</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
