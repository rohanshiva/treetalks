import React, { useState } from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Modal, ModalHeader, ModalBody, SIZE, ROLE } from "baseui/modal";
import { Button, SHAPE, KIND } from "baseui/button";
import { Notification } from "baseui/notification";

import ChevronDown from "baseui/icon/chevron-down";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";

import LoginForm from "./LoginForm";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUser } from "../apis/User";
import { getUser } from "../apis/User";

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

  const login = async () => {
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
          console.log("new user");

          var newUser = {
            email: firebase.auth().currentUser.email,
            username: firebase.auth().currentUser.displayName,
            id: firebase.auth().currentUser.uid,
          };

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

  const mailto = () => {
    window.open(
      "mailto:" + "nadim011@umn.edu" + "?cc=" + "charleshaoshi@gmail.com",
      "_self"
    );
  };

  const github = () => {
    window.open("https://github.com/rohanshiva/treetalks");
  };

  const ITEMS = [
    { label: "Log Out", function: logout },
    { label: "Contact", function: mailto },
    { label: "Github", function: github },
  ];

  return (
    <div>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <Button kind={KIND.minimal}>Tree Talks</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            {user ? (
              // <Button onClick={() => logout()} style={{ borderRadius: "25px" }}>
              //   {user.displayName}
              // </Button>
              <StatefulPopover
                focusLock
                placement={PLACEMENT.bottomLeft}
                content={({ close }) => (
                  <StatefulMenu
                    items={ITEMS}
                    onItemSelect={({ item }) => item.function()}
                    overrides={{
                      List: { style: { width: "120px" } },
                    }}
                  />
                )}
              >
                <Button endEnhancer={() => <ChevronDown />}>Settings</Button>
              </StatefulPopover>
            ) : (
              <Button onClick={() => login()} style={{ borderRadius: "25px" }}>
                Login
              </Button>
            )}
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right} />
      </HeaderNavigation>
    </div>
  );
}
