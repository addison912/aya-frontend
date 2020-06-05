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
    return this.context.verified ? <Comp {...props} /> : <Login />;
  }
}

export default PrivateRoute;
