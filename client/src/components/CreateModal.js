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
import { Button, SHAPE, KIND } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

export default function CreateModal({ isOpen, onClose }) {

 const [topic, setTopic] = useState({topicName: "What's the topic", topicDetails: "Topic details"});
 const onTopicChange = ({ target: { value } }) => {
    setTopic({...topic, topicName: value});
  };
  const onDetailsChange = ({ target: { value } }) => {
    setTopic({...topic, topicDetails: value});
  };
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
      <ModalHeader>Create room</ModalHeader>
      <ModalBody>
        <FormControl label="Debate topic">
          <Input
            value={topic.topicName}
            onChange={onTopicChange}
            type="text"
            required
          />
        </FormControl>
        <FormControl label="Topic details">
          <Input
            value={topic.topicDetails}
            onChange={onDetailsChange}
            type="text"
            required
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose} kind={KIND.minimal}>
          Cancel
        </ModalButton>
        <ModalButton kind={KIND.minimal}>Join</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
