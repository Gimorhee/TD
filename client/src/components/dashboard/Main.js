import React from "react";
import { Tab } from "semantic-ui-react";
// import PropTypes from "prop-types";

const Main = ({}) => {
  const panes = [
    {
      menuItem: "PROFILE",
      render: () => <Tab.Pane attached={false}>PROFILE COMPONENT</Tab.Pane>,
    },
    {
      menuItem: "CUTIES",
      render: () => <Tab.Pane attached={false}>ALL PROFILES COMPONENT</Tab.Pane>,
    },
    {
      menuItem: "POSTS",
      render: () => <Tab.Pane attached={false}>ALL POSTS COMPONENT</Tab.Pane>,
    },
    {
      menuItem: "MESSAGES",
      render: () => <Tab.Pane attached={false}>MESSAGES COMPONENT (TODO)</Tab.Pane>,
    },
  ];

  return (
    <section className="main">
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />{" "}
    </section>
  );
};

// Main.propTypes = {};

export default Main;
