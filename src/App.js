import React from "react";
import LeftNav from "./components/LeftNav";
import Header from "./components/Header";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="landing">
          <Header />
          <LeftNav />
        </div>
      </div>
    );
  }
}

export default App;
