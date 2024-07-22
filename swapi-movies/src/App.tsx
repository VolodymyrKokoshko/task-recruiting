import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from './types';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('https://swapi.dev/api/films/');
      setMovies(response.data.results);
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies
    .filter((movie) =>
      movie.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

  return (
    <div>
      <h1>Star Wars Movies</h1>
      <input
        type="text"
        placeholder="Filter by title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button onClick={() => setSortOrder('asc')}>Sort Asc</button>
      <button onClick={() => setSortOrder('desc')}>Sort Desc</button>
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.episode_id} onClick={() => setSelectedMovie(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.opening_crawl}</p>
          <p><strong>Director:</strong> {selectedMovie.director}</p>
          <p><strong>Producer:</strong> {selectedMovie.producer}</p>
          <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
        </div>
      )}
    </div>
  );
};

export default App;
