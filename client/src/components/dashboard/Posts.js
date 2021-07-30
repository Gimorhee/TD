import React from "react";
import { Card, Feed } from "semantic-ui-react";
import dogImg1 from "../../assets/image/cutedog.jpg";

// import PropTypes from "prop-types";

const Posts = (props) => {
  return (
    <section className="posts">
      <Card className="outerCard">
        <Card.Content className="header">
          <Card.Header>Recent Activity</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="1 days ago" />
                <Feed.Summary>What the woof?</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="1 days ago" />
                <Feed.Summary>Hello?</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="2 days ago" />
                <Feed.Summary>Hello?</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="3 days ago" />
                <Feed.Summary>Anyone here?</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="4 day ago" />
                <Feed.Summary>Feeling good!!!</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="6 days ago" />
                <Feed.Summary>Anyone wanna go for a walk?</Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image={dogImg1} />
              <Feed.Content>
                <Feed.Date content="7 days ago" />
                <Feed.Summary>I am living the life!</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    </section>
  );
};

// Posts.propTypes = {};

export default Posts;
