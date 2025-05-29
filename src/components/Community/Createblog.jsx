import React from 'react';
import UploadForm from './Uploadfrom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINT from '../../config/api.js';

const Createblog = () => {
  const navigate = useNavigate();

  // Handler for creating a new blog post
  const handleCreate = async (data) => {
    try {
      await axios.post(`${API_ENDPOINT}/api/posts/create-post`, data);
      alert('Blog created!');
      navigate('/community'); // Redirect to community page after creation
    } catch (error) {
      alert('Error creating blog');
      console.log(error);
    }
  };

  return (
    <main>
      <UploadForm onSubmit={handleCreate} isEdit={false} />
    </main>
  );
};

export default Createblog;