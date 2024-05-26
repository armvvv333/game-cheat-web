import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheatForm = ({ match }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));

    if (match.params.id) {
      setIsEditing(true);
      axios.get(`/api/cheats/${match.params.id}`)
        .then(response => {
          setName(response.data.name);
          setDescription(response.data.description);
          setCategoryId(response.data.categoryId);
        })
        .catch(error => console.log(error));
    }
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const cheat = { name, description, categoryId };

    try {
      if (isEditing) {
        await axios.put(`/api/cheats/${match.params.id}`, cheat, config);
      } else {
        await axios.post('/api/cheats', cheat, config);
      }
      // Redirect or show success message
    } catch (error) {
      console.log(error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Category</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">{isEditing ? 'Update' : 'Create'} Cheat</button>
    </form>
  );
};

export default CheatForm;
