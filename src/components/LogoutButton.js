/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import UserContext from "../userContext";

class Logout extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div
            className="icon-wrapper logoutButton"
            role="button"
            onClick={context.logout}
            value="logout"
          >
            {/* <input type="submit" value="Logout" onClick={context.logout} /> */}
            <img
              // src={require("../assets/logout.svg")}
              src={require("../assets/images/logout.svg")}
              alt="logout"
            />
            <span>LOGOUT</span>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Logout;
