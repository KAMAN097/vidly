import React, { Component } from "react";
import MovieList from "./component/MovieList";

class App extends Component {
  render() {
    return (
      <main className="container">
        <div className="row p-4">
          <MovieList />
        </div>
      </main>
    );
  }
}

export default App;
