import React from "react";
import UserContext from "../context/userContext";
import { domain } from "../config/constants";
import { navigate } from "@reach/router";
import GoogleButton from "./GoogleButton";

class Login extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    this.props.setLocation("Login");
  }

  onSignIn = googleUser => {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  };

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div className="loginContainer">
            {/* <h2>Login</h2> */}
            <div className="loginForm">
              {/* <a href={`${domain}/auth/login/google`} className="google-login">
                <button type="button" className="google-button">
                  <span className="google-button__icon">
                    <img
                      src={require("../assets/images/google_sign-in.svg")}
                      alt="Google"
                    />
                  </span>
                  <span className="google-button__text">
                    Sign in with Google
                  </span>
                </button>
              </a> */}
              <GoogleButton />
              <input
                type="email"
                id="loginEmail"
                name="email"
                onChange={e => context.toState({ email: e.target.value })}
                value={context.email}
                placeholder="email"
              />
              <input
                type="password"
                id="loginPassword"
                name="password"
                onChange={e => context.toState({ password: e.target.value })}
                value={context.password}
                placeholder="password"
              />
              <input type="submit" value="Submit" onClick={context.login} />
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Login;
