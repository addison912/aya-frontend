import React from "react";
import { Router, navigate } from "@reach/router";

// import Header from "./components/Header";
import Main from "./containers/Main";
import Gallery from "./containers/Gallery";

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <div className="App">
          <Router>
            <Main path="/" />
            <Gallery path="gallery" />
          </Router>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
