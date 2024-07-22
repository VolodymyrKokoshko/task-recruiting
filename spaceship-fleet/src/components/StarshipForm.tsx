import React, { useState } from 'react';
import { Starship } from '../types';

interface StarshipFormProps {
  addStarship: (starship: Starship) => void;
}

const StarshipForm: React.FC<StarshipFormProps> = ({ addStarship }) => {
  const [starship, setStarship] = useState<Starship>({
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: '',
    length: '',
    crew: '',
    passengers: '',
    cargo_capacity: '',
    starship_class: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStarship({ ...starship, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStarship(starship);
    setStarship({
      name: '',
      model: '',
      manufacturer: '',
      cost_in_credits: '',
      length: '',
      crew: '',
      passengers: '',
      cargo_capacity: '',
      starship_class: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={starship.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="model" value={starship.model} onChange={handleChange} placeholder="Model" required />
      <input type="text" name="manufacturer" value={starship.manufacturer} onChange={handleChange} placeholder="Manufacturer" required />
      <input type="text" name="cost_in_credits" value={starship.cost_in_credits} onChange={handleChange} placeholder="Cost in Credits" required />
      <input type="text" name="length" value={starship.length} onChange={handleChange} placeholder="Length" required />
      <input type="text" name="crew" value={starship.crew} onChange={handleChange} placeholder="Crew" required />
      <input type="text" name="passengers" value={starship.passengers} onChange={handleChange} placeholder="Passengers" required />
      <input type="text" name="cargo_capacity" value={starship.cargo_capacity} onChange={handleChange} placeholder="Cargo Capacity" required />
      <input type="text" name="starship_class" value={starship.starship_class} onChange={handleChange} placeholder="Starship Class" required />
      <button type="submit">Add Starship</button>
    </form>
  );
};

export default StarshipForm;
