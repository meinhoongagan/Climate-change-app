import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Forum = () => {
  const categories = [
    { id: 1, name: 'Success Stories' },
    { id: 2, name: 'Blogs' },
    { id: 3, name: 'Discussions' },
  ];

  return (
    <div className="forum-container">
      <h1>Climate Change Forum</h1>
      <div className="category-list">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`} className="category-link">
            <div className="category-card">
              <h2>{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Forum;
