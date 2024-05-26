import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ match }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setIsEditing(true);
      axios.get(`/api/categories/${match.params.id}`)
        .then(response => {
          setName(response.data.name);
          setDescription(response.data.description);
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

    const category = { name, description };

    try {
      if (isEditing) {
        await axios.put(`/api/categories/${match.params.id}`, category, config);
      } else {
        await axios.post('/api/categories', category, config);
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
      <button type="submit">{isEditing ? 'Update' : 'Create'} Category</button>
    </form>
  );
};

export default CategoryForm;
