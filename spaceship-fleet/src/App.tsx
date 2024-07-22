import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Starship } from './types';
import StarshipTable from './components/StarshipTable';
import StarshipForm from './components/StarshipForm';

const App: React.FC = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [localStarships, setLocalStarships] = useState<Starship[]>(() => {
    const saved = localStorage.getItem('starships');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchStarships = async () => {
      const response = await axios.get('https://swapi.dev/api/starships/');
      setStarships(response.data.results);
    };
    fetchStarships();
  }, []);

  useEffect(() => {
    localStorage.setItem('starships', JSON.stringify(localStarships));
  }, [localStarships]);

  const addStarship = (starship: Starship) => {
    setLocalStarships([...localStarships, starship]);
  };

  const editStarship = (index: number, updatedStarship: Starship) => {
    const updatedStarships = localStarships.map((starship, i) => 
      i === index ? updatedStarship : starship
    );
    setLocalStarships(updatedStarships);
  };

  const deleteStarship = (index: number) => {
    const updatedStarships = localStarships.filter((_, i) => i !== index);
    setLocalStarships(updatedStarships);
  };

  return (
    <div>
      <h1>Starship Fleet Management</h1>
      <StarshipForm addStarship={addStarship} />
      <StarshipTable
        starships={[...starships, ...localStarships]}
        editStarship={editStarship}
        deleteStarship={deleteStarship}
      />
    </div>
  );
};

export default App;
