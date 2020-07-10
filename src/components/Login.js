import React from "react";
import UserContext from "../userContext";
import { domain } from "../config/constants";
import { navigate } from "@reach/router";

class Login extends React.Component {
  static contextType = UserContext;

  googleLogin = e => {
    e.preventDefault;
    navigate(`${domain}/auth/login/google`);
  };

  componentDidMount() {
    this.props.setLocation("Login");
  }

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div className="loginContainer">
            {/* <h2>Login</h2> */}
            <div className="loginForm">
              <a href={`${domain}/auth/login/google`} className="google-login">
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
              </a>

              {/*  */}
              {/* <button>Google</button> */}
              {/*  */}
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
