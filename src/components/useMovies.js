import { useState,useEffect } from "react";


export function useMovies(query){
    const [moviesdata, setMoviesdata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const controller = new AbortController();
    
        const KEY = "ead28459";
        async function getMovieDetails() {
          try {
            setIsLoading(true);
            setError("");
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              { signal: controller.signal }
            );
    
            if (!res.ok)
              throw new Error("Something went wrong with fetching movies");
    
            const data = await res.json();
            if (data.Response === "False") throw new Error("Movie not found");
    
            setMoviesdata(data.Search);
            setError("");
          } catch (error) {
            if (error.name !== "AbortError") {
              console.log(error.message);
              setError(error.message);
            }
          } finally {
            setIsLoading(false);
          }
    
          if (query.length < 3) {
            setMoviesdata([]);
            setError("");
            return;
          }
        }
    
        getMovieDetails();
        return function () {
          controller.abort();
        };
      }, [query]);
      return {moviesdata,isLoading,error};
}
