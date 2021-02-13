import React from "react";
import { Avatar } from "baseui/avatar";
import Chat from './Chat';
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

const itemProps = {
  backgroundColor: "mono150",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Room() {
  const players = ["Sponge", "Charlie"];
  return (
    <div>

      <FlexGrid flexGridColumnCount={1} flexGridColumnGap="scale100">
        <FlexGridItem {...itemProps}>
          <section style={{ width: "100%" }}>
            <div style={{margin: '4rem 2rem '}}>
            <h1>Debate busters hdkw271</h1>
            <h1>Climate change</h1>
            <code>climate change is an important problem in today's society what you think? let me know</code>
            </div>

            <FlexGrid
                style={{maxWidth: '350px'}}
              flexGridColumnCount={players.length}
              flexGridColumnGap="scale100"
            >
                {players.map((player) => (
                  <FlexGridItem {...itemProps}>
                  <Avatar
                    name={player}
                    size="scale1200"
                    src="https://api.adorable.io/avatars/285/10@adorable.io.png"
                  />
                </FlexGridItem>
                ))}
            </FlexGrid>
            <Chat/>
          </section>
        </FlexGridItem>
      </FlexGrid>
    </div>
  );
}
