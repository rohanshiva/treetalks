import React from "react";
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";


import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import news from "../data/news.json";
const itemProps = {
  backgroundColor: "mono150",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Home() {
  const topics = [
    { title: "Abortion", description: "Babies" },
    { title: "Climate Change", description: "Babies" },
    { title: "Affirmative Action", description: "Babies" },
    { title: "Universal Basic Income", description: "Babies" },
    { title: "Gay Marriage", description: "Babies" },
    { title: "Millitary Spending", description: "Babies" },
    { title: "Universal Healthcare", description: "small" },
    { title: "Taxes", description: "small" },
    { title: "Corona Virus Vaccine", description: "small" },
    { title: "Gun Control", description: "small" },
    { title: "International Affairs", description: "small" },
    { title: "Poaching", description: "small" },
    { title: "Capital Punishment", description: "small" },
    { title: "Universal Healthcare", description: "small" },
  ];

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
                    overrides={{ BaseButton: { style: { width: "100%", borderRadius: "25px" } } }}
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
            <center>
              <h1>Hot Topics</h1>
              <ul
                className={css({
                  width: "512px",
                  paddingLeft: 0,
                  paddingRight: 0,
                })}
              >
                {topics.map((topic) => (
                  <ListItem
                    artworkSize={ARTWORK_SIZES.LARGE}
                    endEnhancer={() => (
                      <Button  size="compact" kind="secondary" shape="pill">
                        Join
                      </Button>
                    )}
                  >
                    <ListItemLabel>
                      <h4>{topic.title}</h4>
                    </ListItemLabel>
                  </ListItem>
                ))}
              </ul>
            </center>
          </section>
        </FlexGridItem>
        <FlexGridItem {...itemProps}>
          <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
          >
            <FlexGridItem {...itemProps}>
              <h2>News</h2>
            </FlexGridItem>
            <div style = {{
                paddingLeft: "10%",
                height: "100vh",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column"}}>
            {news.map((topic) => (
              <FlexGridItem {...itemProps}>
                <div onClick={() => (
                     window.open(topic.url)
                    )} >
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
