import React, { useState, useEffect } from "react";
import { ListItem, ListItemLabel } from "baseui/list";
import { useStyletron } from "baseui";
import { Button, SHAPE, KIND } from "baseui/button";
import "./styles.css";

import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction } from "baseui/card";
import news from "../data/news.json";
import { getNews } from "../apis/News";
import "./styles.css";
import JoinModal from "../components/JoinModal";
import CreateModal from "../components/CreateModal";
import {getNews} from "../apis/News";
import "./styles.css";

import { toaster, ToasterContainer } from "baseui/toast";

const itemProps = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Home() {
  
  //will connect toast warning after other stuff is integrated.
  
  const [toastKey, setToastKey] = React.useState(null);
  const showToast = () => setToastKey(toaster.warning("Please Login to Use This Feautre!"));
  const closeToast = () => {
    toaster.clear(toastKey);
    setToastKey(null);
  };

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

  const [queriedNews, setQueriedNews] = useState([]);
  const renderNews = async () => {
    var data = await getNews();
    setQueriedNews(data.articles);
  };

  useEffect(() => {
    renderNews();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setCreateModal] = useState(false);
  const [selectTopic, setSelectTopic] = useState(0);
  const [queriedNews, setQueriedNews] = useState([]);
  const renderNews = async () => {
    var data = await getNews();
    console.log("findMe", data);
    setQueriedNews(data.articles);
  }

  useEffect(() => {
    renderNews();
  }, []);

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
                    onClick={() => {
                      setCreateModal(true);
                    }}
                    shape={SHAPE.pill}
                    overrides={{ BaseButton: { style: { width: "100%" } } }}
                  >
                    Create Room
                  </Button>
                </StyledAction>
              </Card>
            </center>
            {showCreateModal && (
              <CreateModal
                isOpen={showCreateModal}
                onClose={() => setCreateModal(false)}
              />
            )}
          </section>
        </FlexGridItem>
        <FlexGridItem className="homeCols" {...itemProps}>
          <section style={{ width: "100%" }}>
            <h1 style={{ marginLeft: "40%" }}>🔥 Hot Topics</h1>
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
                          onClick={() => {
                            setShowModal(true);
                            setSelectTopic(idx);
                          }}
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
                          onClick={() => {
                            setShowModal(true);
                            setSelectTopic(idx);
                          }}
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
            {showModal && (
              <JoinModal
                topic={topics[selectTopic]}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              />
            )}
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
      <ToasterContainer autoHideDuration={4000}> 
    </ToasterContainer>
    </div>
  );
}
