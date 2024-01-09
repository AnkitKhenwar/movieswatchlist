import { useEffect,useState } from "react";


export function useLocalStorageState(initialState,key){
    const [watched, setWatched] = useState(function () {
        let storedValue = localStorage.getItem("movies");
        return storedValue ? JSON.parse(storedValue) :initialState;
      });

      useEffect(() => {
        localStorage.setItem(key, JSON.stringify(watched));
      }, [watched,key]);

      return [watched,setWatched];
}