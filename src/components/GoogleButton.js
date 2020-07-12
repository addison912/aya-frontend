import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import UserContext from "../context/userContext";

const CLIENT_ID =
  "996263343048-bs1krg7m1gea7hnl62fem5hnr4qv4crh.apps.googleusercontent.com";

class GoogleButton extends Component {
  static contextType = UserContext;

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
