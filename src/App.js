import React from "react";
import { Router, navigate } from "@reach/router";

// import Header from "./components/Header";
import Home from "./containers/Home";
import Gallery from "./containers/Gallery";

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <div className="App">
          <Router>
            <Home path="/" />
            <Gallery path="gallery" />
          </Router>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
