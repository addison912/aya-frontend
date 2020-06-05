/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import UserContext from "../userContext";

class Logout extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div className="logoutButton">
            {/* <input type="submit" value="Logout" onClick={context.logout} /> */}
            <img
              src={require("../assets/logout.svg")}
              alt="logout"
              onClick={context.logout}
              value="logout"
            />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Logout;
