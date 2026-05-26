import React, { useEffect } from 'react';
import CommunityCard from './Community-Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '../../redux/UserSlice.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINT from '../../config/api.js';
import './Community.css';

const Community = () => {
  const user = useSelector((state) => state.UserStates.user);
  const blogs = useSelector((state) => state.UserStates.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/posts/all-post`);
        dispatch(setBlogs(response.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="community-page">
      <div className="posts-container">
        <div className="community-title">
          <h1>🌍 Community</h1>
          <span>Share your climate journey and inspire others.</span>
        </div>

        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <CommunityCard
              key={blog._id}
              authorid={blog.author._id}
              name={blog.author.name}
              LikesCount={blog.likes.length}
              title={blog.title}
              description={blog.description}
              CreationDate={blog.updatedAt}
              blogId={blog._id}
              comments={blog.Comments}
              imageUrl={blog.image}
              user={user}
              likedUsers={blog.likes}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '48px 0', fontSize: '0.95rem' }}>
            No posts yet. Be the first to share!
          </div>
        )}
      </div>

      <Link to="/createblog">
        <div className="create-post-button">+</div>
      </Link>
    </div>
  );
};

export default Community;
