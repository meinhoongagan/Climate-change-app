import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';

const Category = () => {
  const { categoryId } = useParams();
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Fetch threads for the category
    const fetchedThreads = [
      { id: 1, title: 'My Journey to Sustainability' },
      { id: 2, title: 'How I Reduced My Carbon Footprint' },
    ];
    setThreads(fetchedThreads);
  }, [categoryId]);

  return (
    <div className="category-container">
      <h2>Threads in Category {categoryId}</h2>
      <div className="thread-list">
        {threads.map((thread) => (
          <Link key={thread.id} to={`/thread/${thread.id}`} className="thread-link">
            <div className="thread-card">
              <h3>{thread.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Link to={`/new-thread?categoryId=${categoryId}`} className="new-thread-button">Create New Thread</Link>
    </div>
  );
};

export default Category;
