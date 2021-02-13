import React, { useState } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import { useStyletron } from "baseui";
import { Button, SHAPE, KIND } from "baseui/button";
<<<<<<< HEAD
import "./styles.css";

=======
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
>>>>>>> f15bc7a5ed001dedef44b4ce653cbdfe7722c0d5
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction } from "baseui/card";
import news from "../data/news.json";
import "./styles.css";

const itemProps = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Home() {
  const topics = [
    {
      emoji: "🤰",
      title: "Abortion",
      description: "Babies",
      question: "What's your view on abortion",
    },
    {
      emoji: "🌳",
      title: "Climate Change",
      description: "Babies",
      question: "What's your view on climate change",
    },
    {
      emoji: "✊🏿",
      title: "Affirmative Action",
      description: "Babies",
      question: "What's your view on affirmative action",
    },
    {
      emoji: "💵",
      title: "Universal Basic Income",
      description: "Babies",
      question: "What's your view on universal basic income",
    },
    {
      emoji: "🌈",
      title: "Gay Marriage",
      description: "Babies",
      question: "What's your view on gay marriage",
    },
    {
      emoji: "💣",
      title: "Millitary Spending",
      description: "Babies",
      question: "What's your view on Millitary Spending",
    },
    {
      emoji: "🏥",
      title: "Universal Healthcare",
      description: "small",
      question: "What's your view on Universal Healthcare",
    },
    {
      emoji: "📑",
      title: "Taxes",
      description: "small",
      question: "What's your view on Taxes",
    },
    {
      emoji: "🦠",
      title: "Corona Virus Vaccine",
      description: "small",
      question: "What's your view on Corona Virus Vaccine",
    },
    { emoji: "🔫", title: "Gun Control", description: "small" },
    {
      emoji: "🌎",
      title: "International Affairs",
      description: "small",
      question: "What's your view on Gun Control",
    },
    {
      emoji: "🐘",
      title: "Poaching",
      description: "small",
      question: "What's your view on Poaching",
    },
    {
      emoji: "🔌",
      title: "Capital Punishment",
      description: "small",
      question: "What's your view on abortion",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [css] = useStyletron();
  return (
    <div>
      <FlexGrid flexGridColumnCount={3} flexGridColumnGap="scale100">
        <FlexGridItem  className="homeCols" {...itemProps}>
          <section style={{ width: "100%" }}>
            <center>
              <Card
                overrides={{
                  Root: { style: { width: "328px", margin: "4rem" } },
                }}
                title="Custom Discussion"
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
        <FlexGridItem className="homeCols" {...itemProps}>
          <section style={{ width: "100%" }}>
            <h1 style={{ marginLeft: "37%" }}>🔥 Hot Topics</h1>
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
                      <h4 style={{whiteSpace: "pre"}}>{topic.emoji}   {topic.title}</h4>
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
                      <h4 style={{whiteSpace: "pre"}}>{topic.emoji}   {topic.title}</h4>
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
        <FlexGridItem  className="homeCols" {...itemProps}>
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
