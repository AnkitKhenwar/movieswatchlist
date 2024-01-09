import React from 'react'


  
const Navbar = ({query,onChange,moviesdata}) => {
  return (
    <div>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={onChange}
        />
        <p className="num-results">
          Found <strong>{moviesdata?.length}</strong> results
        </p>
      </nav>
    </div>
  )
}

export default Navbar
