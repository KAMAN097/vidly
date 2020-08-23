import React, { Component } from "react";
import { getMovies } from "../fakeMovieService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "./utilis/paginate";
class MovieList extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };
  onHandleChange = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="my-2">{count > 0 ? <p>Showing List of {count} movies</p> : <p>Add Movies to show</p>}</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} handleLike={() => this.handleLike(movie)} />
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => this.onHandleChange(movie)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
      </React.Fragment>
    );
  }
}
export default MovieList;
