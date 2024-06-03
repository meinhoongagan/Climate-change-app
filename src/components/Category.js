import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NewThread from './NewThread';
import '../App.css';

const Category = () => {
  const { categoryId } = useParams();
  const [threads, setThreads] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedThreads = JSON.parse(localStorage.getItem(`threads_${categoryId}`)) || [];
    setThreads(storedThreads);
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
      <button onClick={() => setShowForm(!showForm)} className="new-thread-button">
        {showForm ? 'Cancel' : 'Create New Thread'}
      </button>
      {showForm && <NewThread setThreads={setThreads} />}
    </div>
  );
};

export default Category;
