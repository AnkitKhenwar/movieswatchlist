import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useMovies } from "./components/useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const { moviesdata, isLoading, error } = useMovies(query);

  useEffect(() => {
    if (!query) return;
    document.title = `MOVIE | ${query}`;
    return function () {
      document.title = "usepopcorn";
    };
  }, [query]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar query={query} onChange={handleChange} moviesdata={moviesdata} />
      <Main moviesdata={moviesdata} isLoading={isLoading} error={error} />
    </>
  );
}



