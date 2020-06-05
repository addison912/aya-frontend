import React from "react";
import UserContext from "../userContext";
import Login from "./Login";

class PrivateRoute extends React.Component {
  static contextType = UserContext;
  componentDidMount() {
    this.context.verifyToken();
  }
  render() {
    let { as: Comp, ...props } = this.props;
    return this.context.verified ? (
      <Comp {...props} />
    ) : this.context.loaded ? (
      <Login setLocation={this.props.setLocation} />
    ) : null;
  }
}

export default PrivateRoute;
