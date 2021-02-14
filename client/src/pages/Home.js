import React, { useState, useEffect } from "react";
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
import {getNews} from "../apis/News";
import "./styles.css";

const itemProps = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Home() {
  const topics = [
    { emoji: "🤰", title: "Abortion", description: "Babies" },
    { emoji: "🌳", title: "Climate Change", description: "Babies" },
    { emoji: "✊🏿", title: "Affirmative Action", description: "Babies" },
    { emoji: "💵", title: "Universal Basic Income", description: "Babies" },
    { emoji: "🌈", title: "Gay Marriage", description: "Babies" },
    { emoji: "💣", title: "Millitary Spending", description: "Babies" },
    { emoji: "🏥", title: "Universal Healthcare", description: "small" },
    { emoji: "📑", title: "Taxes", description: "small" },
    { emoji: "🦠", title: "Corona Virus Vaccine", description: "small" },
    { emoji: "🔫", title: "Gun Control", description: "small" },
    { emoji: "🌎", title: "International Affairs", description: "small" },
    { emoji: "🐘", title: "Poaching", description: "small" },
    { emoji: "🔌", title: "Capital Punishment", description: "small" },
  ];

  const [queriedNews, setQueriedNews] = useState([]);
  const renderNews = async () => {
    var data = await getNews();
    console.log("findMe", data);
    setQueriedNews(data.articles);
  }

  useEffect(() => {
    renderNews();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [css] = useStyletron();
  return (
    <div>
      <FlexGrid flexGridColumnCount={3} flexGridColumnGap="scale100">
        <FlexGridItem {...itemProps} className="homeCols">
          <section style={{ width: "100%"}}>
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
        <FlexGridItem {...itemProps} className="homeCols">
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
        <FlexGridItem {...itemProps} className="homeCols">
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
              {queriedNews.length > 0 ? (queriedNews.map((topic) => (
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
                      headerImage={topic.urlToImage}
                    >
                      <h4>{topic.title}</h4>
                    </Card>
                  </div>
                </FlexGridItem>
              ))): (null)}
            </div>
          </FlexGrid>
        </FlexGridItem>
      </FlexGrid>
    </div>
  );
}
