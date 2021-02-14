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
import { KIND } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {createRoom} from '../apis/Room';
import { useHistory } from "react-router-dom";


export default function CreateModal({ isOpen, onClose, topicName, topicDetails }) {
const history = useHistory();
 const [topic, setTopic] = useState({topicName: "Issue Topic", topicDetails: "Issue Description"});
 const onTopicChange = ({ target: { value } }) => {
    setTopic({...topic, topicName: value});
  };
  const onDetailsChange = ({ target: { value } }) => {
    setTopic({...topic, topicDetails: value});
  };

  const handleJoin = async () => {
    const room = await createRoom(); 
    const topicDetails = {
      title: topic.topicName,
      details: topic.topicDetails
    };
    history.push(`/${room}`, { params: topicDetails, isCustom: true})
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
