import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Modal, ModalHeader, ModalBody, SIZE, ROLE } from "baseui/modal";
import { Button } from "baseui/button";
import { Notification, KIND } from "baseui/notification";
import LoginForm from "./LoginForm";

import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {createUser} from "../../apis/User";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [user] = useAuthState(firebase.auth());

  const handleAuth = () => {
    console.log("triggered");
    if (user) {
      logout();
    } else {
      login();
    }
  };

  const login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("logged in!");
        if (
          firebase.auth().currentUser.metadata.creationTime ===
          firebase.auth().currentUser.metadata.lastSignInTime
        ) {

          var newUser = {
            email: firebase.auth().currentUser.email,
            username: firebase.auth().currentUser.displayName,
            id: firebase.auth().currentUser.uid
          }

          createUser(newUser);
        
        } else {
          console.log("not a new user");
          // login
        }

      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  const logout = () => {
    console.log(user);
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };

  return (
    <div>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <Button> Tree Talks</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Button onClick={() => handleAuth()}>
              {user ? "Log Out" : "Login"}
            </Button>
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
