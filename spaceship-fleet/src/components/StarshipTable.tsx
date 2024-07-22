import React, { useState } from 'react';
import { Starship } from '../types';

interface StarshipTableProps {
  starships: Starship[];
  editStarship: (index: number, updatedStarship: Starship) => void;
  deleteStarship: (index: number) => void;
}

const StarshipTable: React.FC<StarshipTableProps> = ({ starships, editStarship, deleteStarship }) => {
  const [filter, setFilter] = useState<string>('');
  const [sortKey, setSortKey] = useState<keyof Starship>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredStarships = starships
    .filter(starship => starship.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => { setSortKey('name'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Name</th>
            <th onClick={() => { setSortKey('model'); setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }}>Model</th>
            <th>Manufacturer</th>
            <th>Cost</th>
            <th>Length</th>
            <th>Crew</th>
            <th>Passengers</th>
            <th>Cargo Capacity</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStarships.map((starship, index) => (
            <tr key={index}>
              <td>{starship.name}</td>
              <td>{starship.model}</td>
              <td>{starship.manufacturer}</td>
              <td>{starship.cost_in_credits}</td>
              <td>{starship.length}</td>
              <td>{starship.crew}</td>
              <td>{starship.passengers}</td>
              <td>{starship.cargo_capacity}</td>
              <td>{starship.starship_class}</td>
              <td>
                <button onClick={() => deleteStarship(index)}>Delete</button>
                <button onClick={() => editStarship(index, starship)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarshipTable;
