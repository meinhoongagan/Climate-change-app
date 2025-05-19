import React from 'react'
import './Community.css'
import CommunityCard from './Community-Card.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {setBlogs} from '../../redux/UserSlice.js'
import axios from 'axios';

const Community = () => {
    const user = useSelector((state) => state.UserStates.user);
    const blogs = useSelector((state) => state.UserStates.blogs);
    const dispatch = useDispatch();
    console.log(user);

    useEffect(() => {
        // async await function to fetch the blogs data than dispatch it to store and then get it back specially the my blogs and map all blogs and add various funvtionaliy
        const fetchBlogs = async () =>{
            try {
                const blogs = await axios.get("http://localhost:8000/api/posts/all-post");
                // console.log("community",blogs.data) // iske ander data array he jisme sare post hain jo sab kuch rakha he
                dispatch(setBlogs(blogs.data.data));
            } catch (error) {
                console.log(error);
            }
        }
        console.log("blogs from store",blogs)
        fetchBlogs();
      }, []);

  return (
      <>
      <div className='wrapper'>
      <div className='content'>
          {/* community header */}
          <div className='community-header'>
              <h1>Community</h1>
              <span>Join our community of users and share your experience with others.</span>
          </div>
          <div >
          { blogs && blogs.map((blog)=>(
          <div key={blog._id}>
          <CommunityCard authorid={blog.author._id} name={blog.author.name} LikesCount={blog.likes.length} title={blog.title} description={blog.description} CreationDate={blog.updatedAt} blogId={blog._id} comments={blog.Comments} imageUrl={blog.image} /></div>        
          ))}
          </div>
      </div>
      </div>
      </>
  )
}

export default Community

