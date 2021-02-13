import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Modal, ModalHeader, ModalBody, SIZE, ROLE } from "baseui/modal";
import { Button } from "baseui/button";
import LoginForm from "./LoginForm";
import { KIND as ButtonKind } from "baseui/button";

import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <Button kind={ButtonKind.tertiary} > Tree Talks</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Button   onClick={() => setIsOpen(true)} kind={ButtonKind.tertiary}>Log in</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right} />
      </HeaderNavigation>

      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Welcome back</ModalHeader>
        <ModalBody>
          <LoginForm></LoginForm>
        </ModalBody>
      </Modal>
    </div>
  );
}
