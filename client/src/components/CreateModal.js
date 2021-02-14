import React, { useState , useEffect} from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Link } from "react-router-dom";
import { Button, SHAPE, KIND } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {createRoom} from '../apis/Room';
import { useHistory } from "react-router-dom";


export default function CreateModal({ isOpen, onClose }) {
const history = useHistory();
 const [join, setJoin] = useState(false);
 const [topic, setTopic] = useState({topicName: "What's the topic", topicDetails: "Topic details"});
 const onTopicChange = ({ target: { value } }) => {
    setTopic({...topic, topicName: value});
  };
  const onDetailsChange = ({ target: { value } }) => {
    setTopic({...topic, topicDetails: value});
  };

  const handleJoin = async () => {
    const room = await createRoom(); 
    history.push(`/${room}`, { params: topic})
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

        <ModalButton onClick={handleJoin} kind={KIND.minimal}>Join</ModalButton>

      </ModalFooter>
    </Modal>
  );
}
