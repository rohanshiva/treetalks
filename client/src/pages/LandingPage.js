import React from "react";
import { Heading, HeadingLevel } from "baseui/heading";


import "../App.css";
export default function LandingPage() {
  return (
    <div className="App">
      <section style={{ margin: "4rem 2rem" }}>
      <HeadingLevel>
          <Heading style={{ fontWeight: "700" }} styleLevel={3}>
            Learn debugging together
          </Heading>
        </HeadingLevel>
        <HeadingLevel>
          <Heading style={{ fontWeight: "600" }} styleLevel={6}>
            Create a room, invite your friends, and race to debug the problems
          </Heading>
        </HeadingLevel>
      </section>

    </div>
  );
}
