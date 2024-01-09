import {  useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useLocalStorageState } from "./useLocalStorageState";
const Main = ({ moviesdata, isLoading, error }) => {
  const [showMovie, setShowMovie] = useState([]);
  const [watched, setWatched] = useLocalStorageState([],"movies");
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const KEY = "ead28459";

  function handleClose() {
    setShowMovie();
  }

  function handleWatchList(movie) {
    // Check if the movie is undefined or null
    if (!movie) return;

    // Check if the movie is already in the watched list
    if (watched.some((watchedMovie) => watchedMovie.imdbID === movie.imdbID)) {
      // Movie is already in the list, so don't add it again
      console.log("Movie already in watch list");
      return;
    }

    // Update the watched movies list using the functional update pattern
    setWatched((movies) => [...movies, movie]);
  }
  

  function handleDelete(id) {
    setWatched((items) => items.filter((item) => item.imdbID !== id));
  }

  //  setIsLoading(true);
  async function getMovieDetails(id) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
    const data = await res.json();
    console.log(data);
    setShowMovie([data]);
  }

  return (
    <>
      <main className="main">
        {isLoading && error && <LoadingSpinner />}

        {!isLoading && !error && (
          <div className="box">
            <button
              className="btn-toggle"
              onClick={() => setIsOpen1((open) => !open)}
            >
              {isOpen1 ? "–" : "+"}
            </button>
            <h1 style={{ textAlign: "center" }}>Movies To Watch!</h1>

            {isOpen1 && (
              <ul className="list">
                {moviesdata?.map((movie) => {
                  return (
                    <>
                      <li
                        key={movie.imdbID}
                        onClick={() => getMovieDetails(movie.imdbID)}
                      >
                        <img src={movie?.Poster} alt="Batman" />
                        <h3>{movie?.Title}</h3>
                        <div>
                          <p>
                            <span>🗓</span>
                            <span>Release Year:{movie?.Year}</span>
                            <span>{movie?.displayableProperty?.text}</span>
                          </p>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            )}
          </div>
        )}
        {error && <Error error={error} />}

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "-" : "+"}
          </button>
          {isOpen2 && (
            <div>
              <h2 style={{ textAlign: "center", fontSize: "25px" }}>
                Movie Preview!!
              </h2>

              {showMovie?.map((movie) => {
                return (
                  <div className="details">
                    <header>
                      <button className="btn-back" onClick={handleClose}>
                        ←
                      </button>
                      <img src={movie?.Poster} alt="Poster of Movie" />
                      <div className="details-overview">
                        <h2>{movie?.Title}</h2>
                        <p>{movie?.Year}</p>
                        <p>{movie?.Genre}</p>
                        <p>
                          <span>⭐️</span>
                          {movie?.imdbRating} IMDB Rating
                        </p>
                      </div>
                    </header>
                    <section>
                      <div className="rating">
                        <div
                          className="ak"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                          }}
                        >
                          <div style={{ display: "flex" }}></div>
                          <p>
                            <button
                              className="btn-add"
                              onClick={() => handleWatchList(movie)}
                            >
                              Add To WatchList
                            </button>
                          </p>
                        </div>
                      </div>
                      <p>
                        <em>{movie?.Plot}</em>
                      </p>
                      <p>
                        Starring {movie?.Actors}
                        Page
                      </p>
                      <p>Directed by {movie?.Director}</p>
                    </section>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          <h1 style={{ textAlign: "center" }}>Movies Added To WatchList!</h1>
          {isOpen1 && (
            <ul className="list">
              {watched?.map((movie) => {
                return (
                  <li
                    key={movie?.imdbId}
                   
                  >
                    <img src={movie?.Poster} alt="Batman" />
                    <h3>{movie?.Title}</h3>

                    <div>
                      <p>
                        <span>🗓</span>
                        <span>Release Year: {movie?.Year}</span>
                        <span>
                          <button
                            style={{
                              fontSize: "20px",
                              margin: "10px",
                              backgroundColor: "#6741d9",
                              color: "white",
                              padding: "10px",
                              cursor: "pointer",
                              borderRadius: "25px",
                            }}
                            onClick={() => handleDelete(movie.imdbID)}
                          >
                            Delete
                          </button>
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </>
  );
};

function Error({ error }) {
  return <h1>{error}</h1>;
}
export default Main;
