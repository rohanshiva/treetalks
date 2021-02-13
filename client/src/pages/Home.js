import React, { useState } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import { useStyletron } from "baseui";
import { Button, SHAPE, KIND } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction } from "baseui/card";
import news from "../data/news.json";

const itemProps = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Home() {
  const topics = [
    { title: "🤰 Abortion", description: "Babies" },
    { title: "🌳 Climate Change", description: "Babies" },
    { title: "✊🏿 Affirmative Action", description: "Babies" },
    { title: "💵 Universal Basic Income", description: "Babies" },
    { title: "🌈 Gay Marriage", description: "Babies" },
    { title: "💣 Millitary Spending", description: "Babies" },
    { title: "🏥 Universal Healthcare", description: "small" },
    { title: "📑 Taxes", description: "small" },
    { title: "🦠 Corona Virus Vaccine", description: "small" },
    { title: "🔫 Gun Control", description: "small" },
    { title: "🌎 International Affairs", description: "small" },
    { title: "🐘 Poaching", description: "small" },
    { title: "🔌 Capital Punishment", description: "small" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [css] = useStyletron();
  return (
    <div>
      <FlexGrid flexGridColumnCount={3} flexGridColumnGap="scale100">
        <FlexGridItem {...itemProps}>
          <section style={{ width: "100%" }}>
            <center>
              <Card
                overrides={{
                  Root: { style: { width: "328px", margin: "4rem" } },
                }}
                title="Private Debate"
              >
                <StyledBody>
                  Create a private room to debate with your friends on any
                  topic.
                </StyledBody>
                <StyledAction>
                  <Button
                    shape={SHAPE.pill}
                    overrides={{ BaseButton: { style: { width: "100%" } } }}
                  >
                    Create Room
                  </Button>
                </StyledAction>
              </Card>
            </center>
          </section>
        </FlexGridItem>
        <FlexGridItem {...itemProps}>
          <section style={{ width: "100%" }}>
            <h1 style={{ marginLeft: "2.5em" }}>🔥 Hot Topics</h1>
            <center>
              <ul
                className={css({
                  width: "512px",
                  paddingLeft: 0,
                  paddingRight: 0,
                })}
              >
                {topics.map((topic, idx) =>
                  idx % 2 === 0 ? (
                    <ListItem
                      endEnhancer={() => (
                        <Button
                          onClick={() => setIsOpen(true)}
                          size="compact"
                          kind="minimal"
                        >
                          Join
                        </Button>
                      )}
                      overrides={{
                        Root: {
                          style: ({ $theme }) => ({
                            backgroundColor: $theme.colors.mono300,
                          }),
                        },
                      }}
                    >
                      <ListItemLabel>
                        <h4>{topic.title}</h4>
                      </ListItemLabel>
                    </ListItem>
                  ) : (
                    <ListItem
                      endEnhancer={() => (
                        <Button
                          onClick={() => setIsOpen(true)}
                          size="compact"
                          kind="minimal"
                        >
                          Join
                        </Button>
                      )}
                    >
                      <ListItemLabel>
                        <h4>{topic.title}</h4>
                      </ListItemLabel>
                    </ListItem>
                  )
                )}
              </ul>
            </center>

            <Modal
              onClose={() => setIsOpen(false)}
              closeable
              isOpen={isOpen}
              animate
              autoFocus
              size={SIZE.default}
              role={ROLE.dialog}
            >
              <ModalHeader>Hello world</ModalHeader>
              <ModalBody>
                Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
                ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris
                ut tempus.
              </ModalBody>
              <ModalFooter>
                <ModalButton
                  onClick={() => setIsOpen(false)}
                  kind={KIND.minimal}
                >
                  Cancel
                </ModalButton>
                <ModalButton kind={KIND.minimal}>Join</ModalButton>
              </ModalFooter>
            </Modal>
          </section>
        </FlexGridItem>
        <FlexGridItem {...itemProps}>
          <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale400"
          >
            <FlexGridItem {...itemProps}>
              <h2>News 📰</h2>
            </FlexGridItem>
            <div
              style={{
                paddingLeft: "10%",
                height: "100vh",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {news.map((topic) => (
                <FlexGridItem {...itemProps}>
                  <div onClick={() => window.open(topic.url)}>
                    <Card
                      overrides={{
                        Root: { style: { width: "324px", border: "none" } },
                        HeaderImage: {
                          style: ({ $theme }) => ({
                            borderRadius: "25px",
                          }),
                        },
                      }}
                      headerImage={topic.image}
                    >
                      <h4>{topic.description}</h4>
                    </Card>
                  </div>
                </FlexGridItem>
              ))}
            </div>
          </FlexGrid>
        </FlexGridItem>
      </FlexGrid>
    </div>
  );
}
