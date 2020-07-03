/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import axios from "axios";
import AboutContext from "../context/aboutContext";
import { domain } from "../config/constants";
import ClientList from "../components/ClientList";
import Contact from "../components/Contact";
import Press from "../components/Press";
import Bio from "../components/Bio";
import ProfilePicUpload from "../components/ProfilePicUpload";

class About extends Component {
  state = {
    clients: {},
    bio: "",
    press: [],
    contact: [],
    edit: "",
    toState: this.toState,
    profilePic: `${domain}/uploads/about/profile-pic.jpg`,
    imageHash: Date.now()
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

  submitEdit = edit => {
    // console.log(edit);
    axios
      .post(`${domain}/api/about/edit`, edit, {
        headers: {
          authorization: `bearer ${window.sessionStorage.ayaToken}`
        }
      })
      .then(about => {
        console.log(about.data);
        this.setState({
          clients: about.data.clients,
          bio: about.data.bio,
          press: about.data.press,
          contact: about.data.contact,
          edit: false
        });
      });
  };

  componentDidMount() {
    this.props.setLocation("About");
    this.getAbout();
  }
  render() {
    return (
      <AboutContext.Provider value={this.state}>
        <div className="main">
          <div className="about-container">
            {this.state.edit == "profilePic" ? (
              <ProfilePicUpload
                toState={this.toState}
                profilePicUpdates={this.state.profilePicUpdates}
              />
            ) : (
              <img
                className="profile-pic"
                data={this.state.profilePicUpdates}
                src={`${this.state.profilePic}?${this.state.imageHash}`}
                alt="Aya"
                onClick={() => this.setState({ edit: "profilePic" })}
              />
            )}
            <Contact toState={this.toState} submitEdit={this.submitEdit} />
            <Bio
              toState={this.toState}
              bio={this.state.bio}
              submitEdit={this.submitEdit}
            />
            <Press toState={this.toState} submitEdit={this.submitEdit} />
            <ClientList toState={this.toState} submitEdit={this.submitEdit} />
          </div>
        </div>
      </AboutContext.Provider>
    );
  }
}

export default About;
