import React, { useState } from "react";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ModalFooter, ModalButton } from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";

export default function LoginForm() {
//   const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailChange = ({ target: { value } }) => {
    setEmail(value);
  };
  const onPasswordChange = ({ target: { value } }) => {
    setPassword(value);
  };
  return (
    <div>
      {
        <form onSubmit={(e) => e.preventDefault()}>
          <FormControl label="Your email">
            <Input
              id="email-input"
              value={email}
              onChange={onEmailChange}
              type="email"
              required
            />
          </FormControl>

          <FormControl label="Password">
            <Input
              id="password"
              value={password}
              onChange={onPasswordChange}
              type="password"
              required
            />
          </FormControl>
          <ModalFooter>
            <ModalButton type="submit" >
              Login
            </ModalButton>

          </ModalFooter>
        </form>
      }
    </div>
  );
}
