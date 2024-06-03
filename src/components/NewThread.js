import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const NewThread = ({ setThreads }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryId = query.get('categoryId');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newThread = { id: Date.now(), title, content, categoryId };
    const storedThreads = JSON.parse(localStorage.getItem(`threads_${categoryId}`)) || [];
    const updatedThreads = [...storedThreads, newThread];
    localStorage.setItem(`threads_${categoryId}`, JSON.stringify(updatedThreads));
    setThreads(updatedThreads);
    navigate(`/category/${categoryId}`);
  };

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Thread Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Thread Content"
        required
      />
      <button type="submit">Create Thread</button>
    </form>
  );
};

export default NewThread;
