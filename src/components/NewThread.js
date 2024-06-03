import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../App.css';

const NewThread = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('categoryId');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle thread creation
    const newThread = { id: Date.now(), title, content };
    // For simplicity, we'll just log the new thread
    console.log('New thread created:', newThread);
    history.push(`/category/${categoryId}`);
  };

  return (
    <div className="new-thread-container">
      <h2>Create New Thread</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewThread;
