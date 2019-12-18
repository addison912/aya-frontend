import React from "react";
import { Router, navigate, Link } from "@reach/router";

// import Header from "./components/Header";
import Main from "./containers/Main";
import About from "./containers/About";
import News from "./containers/News";
import Shop from "./containers/Shop";
// import LeftNav from "./components/LeftNav";

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <div className="App">
          <Router className="router">
            <Main path="/" />
            <About path="/about" />
            <News path="/news" />
            <Shop path="/shop" />
          </Router>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
