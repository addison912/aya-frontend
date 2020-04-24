import React, { Component } from "react";
import { domain } from "../config/constants";
import ClientList from "../components/ClientList";

class About extends Component {
  state = {
    about: {},
    clients: []
  };

  getAbout = () => {
    fetch(`${domain}/api/about/all`)
      .then(res => {
        return res.json();
      })
      .then(about => {
        this.setState({ about, clients: about.clients ? about.clients : null });
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
          <div className="contact-info">
            <h1>Contact</h1>
            <ul>
              <li>aya@ayabrackett.com</li>
              <li>(510) 292-5719</li>
              <li>
                <a href="https://www.instagram.com/ayabrackett/" target="_blank">
                  @ayabrackett
                </a>
              </li>
            </ul>
          </div>
          <div className="bio">
            <h1>About</h1>
            <p>
              Aya Brackett was born and raised in a traditionally built Japanese
              house in Nevada City, CA and is now based in Oakland, CA. She grew
              up with two wood stoves, a generator for electricity and a long
              dirt road. Aya received a Magna Cum Laude dual B.A. in Visual Arts
              and East Asian Studies from Brown University, and also studied
              photography at Rhode Island School of Design and the California
              College of the Arts. She worked for four years as a photo editor
              at Dwell Magazine where she contributed her own photography and
              styled food and props for many shoots. Her love of food and design
              informs her photography and fuels a constant search for the
              unusual and inspiring.
            </p>
          </div>
          <div className="press">
            <h1>Press</h1>
            <ul>
              <li>
                <a href="https://pdnonline.com/gear/lighting-techniques/photographers-bringing-life-still-lifes/">
                  4 Forward-Thinking Food Photographers
                </a>
                , PDN, 2017
              </li>
              <li>
                <a href="https://www.jamesbeard.org/blog/2015-james-beard-award-winners">
                  James Beard Award
                </a>{" "}
                for “Bitter” Ten Speed Press, 2015
              </li>
              <li>
                1st Place,{" "}
                <a href="https://www.pdntaste.com/pastwinners/winners/PDNTaste/353">
                  Taste Photo Contest
                </a>
                , PDN, 2014
              </li>
              <li>American Photography Annual, 2007, 2011, 2012, and 2014</li>
              <li>30 Top Photographers, PDN, 2008</li>
            </ul>
          </div>
          <ClientList clients={this.state.clients} />
        </div>
      </div>
    );
  }
}

export default About;
