import React, {useState} from "react";
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

export default function CreateModal({isOpen, onClose}) {

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
      <ModalHeader>Hello world</ModalHeader>
      <ModalBody>
        {topic.question}
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
