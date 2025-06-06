import React, { useEffect } from 'react';
// import './Cards.css'; 
import CommunityCard from './Community-Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '../../redux/UserSlice.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINT from '../../config/api.js';

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
  }, [dispatch]); // Removed 'blogs' from dependencies to prevent infinite loop

  return (
    <div className='app-container'>
      <div className='posts-container'>
        {/* Community header */}
        <div className='community-title'>
          <h1>Community</h1>
          <span>Join our community of users and share your experience with others.</span>
        </div>
        <div>
          {blogs && blogs.map((blog) => (
            <div key={blog._id}>
              <CommunityCard
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
            </div>
          ))}
        </div>
      </div>
      <Link to="/createblog">
        <div className='create-post-button'>+</div>
      </Link>
    </div>
  );
};

export default Community;