import React, { Component } from "react";
import { domain } from "../config/constants";
import LeftNav from "../components/LeftNav";
import Logo from "../components/Logo";

class About extends Component {
  state = {
    photo: "",
    message: ""
  };

  //   getimages = () => {
  //     fetch(`${domain}/api/test`)
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(text => {
  //         console.log(text);
  //         this.setState({ message: text.message });
  //       });
  //   };
  render() {
    return (
      <div className="main about">
        <Logo className="logo" />
        <LeftNav categoryClickHandler={this.categoryClickHandler} />
        <div className="profile-pic">
          <img src={require("../assets/images/profile-pic.png")} alt="" />
        </div>
        <div className="contact-info">
          <h2>Contact</h2>
          <p>aya@ayabrackett.com</p>
          <p>(510) 292-5719</p>
          <p>@ayabrackett</p>
        </div>
        <div className="about-scroll">
          <section>
            <p className="bio">
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
          </section>
          <section className="press">
            <h2>Press</h2>
            <p>
              American Photography Annual, 2007, 2011, 2012, and 2014 30 Top
              Photographers PDN, 2008 1st Place, Taste Photo Contest, PDN, 2014
              James Beard Award for “Bitter” Ten Speed Press, 2015 4
              Forward-Thinking Food Photographers, PDN, 2017
            </p>
          </section>
          <section className="clients">
            <h2>Clients</h2>
            <div className="client-lists">
              <ul>
                <li>EDITORIAL</li>
                <li>Anthology</li>
                <li>Afar</li>
                <li>Bon Appetit</li>
                <li>Brutus/Casa Brutus</li>
                <li>Budget Travel</li>
                <li>Cherry Bombe</li>
                <li>Diner’s Journal</li>
                <li>Dossier</li>
                <li>Dwell</li>
                <li>Elle & Elle å Table</li>
                <li>Gastronomica</li>
                <li>Martha Stewart</li>
                <li>Men’s Health</li>
                <li>Metropolis</li>
                <li>Monocle</li>
                <li>More</li>
                <li>New York Times Magazine</li>
                <li>O The Oprah Magazine</li>
                <li>PDN</li>
                <li>Real Simple</li>
                <li>San Francisco Magazine</li>
                <li>Sunset</li>
                <li>Telegraph Sunday Magazine</li>
                <li>Travel + Leisure</li>
                <li>Vogue Japan / Australia</li>
                <li>Wall Street Journal Magazine </li>
                <li>World of Interiors</li>
              </ul>
              <ul>
                <li>ADVERTISING</li>
                <li>Apple</li>
                <li>Airbnb</li>
                <li>Chez Panisse</li>
                <li>Dosa Clothing</li>
                <li>Equal Exchange</li>
                <li>Fairmont Hotels</li>
                <li>Landscape Products</li>
                <li>Method</li>
                <li>Moderntwist</li>
                <li>Nest Labs Inc</li>
                <li>Orange Chef</li>
                <li>Rintaro Restaurant</li>
                <li>Ritz Carlton</li>
                <li>Quince Restaurant</li>
                <li>Sightglass Coffee</li>
                <li>Slanted Door Restaurant</li>
                <li>Slow Food USA</li>
                <li>Small Trade Company</li>
                <li>Susan/Grocery Store</li>
                <li>Urban Research Clothing</li>
              </ul>
              <ul>
                <li>PUBLISHERS</li>
                <li>Artisan Books</li>
                <li>American Express Publishing</li>
                <li>Chelsea Green Publishing</li>
                <li>Clarkson Potter</li>
                <li>Gestalten</li>
                <li>Gibbs Smith Publishing</li>
                <li>Harry Abrams Inc.</li>
                <li>Houghton Mifflin Harcourt</li>
                <li>Rodale Publishing</li>
                <li>Taunton Press</li>
                <li>Ten Speed Press</li>
              </ul>
            </div>
          </section>
        </div>
        {/* <div className="content">
          <div className="page-container">
            <h1>About Page Coming Soon!</h1>
          </div>
        </div> */}
      </div>
    );
  }
}

export default About;
