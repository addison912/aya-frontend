import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import { domain } from "../config/constants";
import UserContext from "../context/userContext";

const CLIENT_ID =
  "996263343048-bs1krg7m1gea7hnl62fem5hnr4qv4crh.apps.googleusercontent.com";

class GoogleButton extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       isLogined: false,
  //       accessToken: ""
  //     };

  //     // this.login = this.login.bind(this);
  //     this.handleLoginFailure = this.handleLoginFailure.bind(this);
  //     this.logout = this.logout.bind(this);
  //     this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  //   }
  static contextType = UserContext;

  //   logout = response => {
  //     this.setState(state => ({
  //       isLogined: false,
  //       accessToken: ""
  //     }));
  //   };

  handleLoginFailure = response => {
    console.log(response);
    alert("Failed to log in");
  };

  handleLogoutFailure = response => {
    alert("Failed to log out");
  };

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div>
            {/* {this.state.isLogined ? (
              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.logout}
                onFailure={this.handleLogoutFailure}
              ></GoogleLogout>
            ) : ( */}
            <GoogleLogin
              className="google-button"
              clientId={CLIENT_ID}
              buttonText="Sign in with Google"
              theme="dark"
              onSuccess={context.googleLogin}
              onFailure={this.handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
            {/* )} */}
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default GoogleButton;
