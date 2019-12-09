import React from "react";
import { Router, navigate, Link } from "@reach/router";

// import Header from "./components/Header";
import Main from "./containers/Main";
// import About from "./containers/About";
// import LeftNav from "./components/LeftNav";

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <div className="App">
          {/* <Router>
            <Main path="/" />
            <About path="about" />
          </Router> */}
          <Main />
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
