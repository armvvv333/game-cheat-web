import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cheats = () => {
  const { categoryId } = useParams();
  const [cheats, setCheats] = useState([]);

  useEffect(() => {
    axios.get(`/api/cheats/${categoryId}`)
      .then(response => setCheats(response.data))
      .catch(error => console.log(error));
  }, [categoryId]);

  return (
    <div>
      <h1>Cheats</h1>
      <ul>
        {cheats.map(cheat => (
          <li key={cheat.id}>{cheat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cheats;
