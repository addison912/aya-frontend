/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import AboutContext from "../aboutContext";
import { domain } from "../config/constants";
import ClientList from "../components/ClientList";
import Contact from "../components/Contact";
import Press from "../components/Press";
import Bio from "../components/Bio";

class About extends Component {
  state = {
    clients: [],
    bio: "",
    press: [],
    contact: [],
    edit: "",
    toState: this.toState
  };

  toState = input => {
    this.setState(input);
  };

  getAbout = () => {
    fetch(`${domain}/api/about/all`)
      .then(res => {
        return res.json();
      })
      .then(about => {
        this.setState({
          clients: about.clients,
          bio: about.bio,
          press: about.press,
          contact: about.contact
        });
      });
  };

  // exitEdit = e => {
  //     this.setState({ edit: "" });
  //   }
  // };

  componentDidMount() {
    this.props.setLocation("About");
    this.getAbout();
  }
  render() {
    return (
      <AboutContext.Provider value={this.state}>
        <div className="main">
          <div className="about-container">
            <img
              className="profile-pic"
              src={require("../assets/images/profile-pic.jpg")}
              alt="Aya"
            />
            <Contact toState={this.toState} />
            <Bio toState={this.toState} />
            <Press toState={this.toState} />
            <ClientList toState={this.toState} />
          </div>
        </div>
      </AboutContext.Provider>
    );
  }
}

export default About;
