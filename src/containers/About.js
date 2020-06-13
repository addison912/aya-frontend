import React, { Component } from "react";
import { domain } from "../config/constants";
import ClientList from "../components/ClientList";
import Contact from "../components/Contact";
import Press from "../components/Press";

class About extends Component {
  state = {
    clients: [],
    bio: "",
    press: [],
    contact: []
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
  componentDidMount() {
    this.props.setLocation("About");
    this.getAbout();
  }
  render() {
    return (
      <div className="main">
        <div className="about-container">
          <img
            className="profile-pic"
            src={require("../assets/images/profile-pic.jpg")}
            alt="Aya"
          />
          <Contact contact={this.state.contact} />
          <div className="bio">
            <h1>About</h1>
            <p dangerouslySetInnerHTML={{ __html: this.state.bio }}></p>
          </div>
          <Press press={this.state.press} />
          <ClientList clients={this.state.clients} />
        </div>
      </div>
    );
  }
}

export default About;
