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
import { Textarea } from "baseui/textarea";

export default function TweetModal({ isOpen, onClose}) {
  const websiteUrl = "https://github.com/rohanshiva/treetalks"
  const topicName = "Climate Change";
  const constantTweet = `Today, I had the pleasure to discuss about ${topicName}. `
  const charsLeft = 280 - constantTweet.length - topicName.length - websiteUrl.length;

  const [textArea, setTextArea] = useState("");

  const tweet = () => {
      console.log("triggered");
      console.log(textArea);
      window.open(`https://twitter.com/intent/tweet?url=${encodeURI(websiteUrl)}&text=${constantTweet}${encodeURI(textArea)}`);
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
      <ModalHeader>Share Your Biggest Takeaway</ModalHeader>
      <ModalBody>
        <FormControl label="Your Takeaway:">
          <Textarea
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            placeholder="What did you learn after this discussion?"
            clearOnEscape
            maxLength={charsLeft}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose} kind={KIND.minimal}>
          No, Thanks
        </ModalButton>
        <ModalButton kind={KIND.minimal} onClick={tweet}>Tweet</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
