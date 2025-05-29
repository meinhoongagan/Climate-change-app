import React, { useEffect, useState } from 'react';
import '../Dashboard/Dashboard.css';
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';

const Dashboard = () => {
  const [pdfs, setPdfs] = useState([]);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUser(userData);

    const getAllPdfs = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8000/api/pdf/getPdfs/${userId}`, {
          withCredentials: true
        });

        if (response.status === 200) {
          setPdfs(response.data.pdfs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getAllPosts = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8000/api/posts/get-user-posts/${userId}`, {
          withCredentials: true
        });

        if (response.status === 200) {
          setPosts(response.data.posts);
          console.log(response.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllPosts();
    getAllPdfs();
    
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  // Handle View button click for PDFs
  const handleView = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      console.error('No PDF URL provided');
    }
  };

  // Handle View button click for Posts
  const handleViewPost = (postUrl) => {
    if (postUrl) {
      window.open(postUrl, '_blank');
    } else {
      console.error('No Post URL provided');
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar Section */}
      <aside className="sidebar">
        <div className="details">
          <p className="profile">Climate App</p>

          {/* Profile Photo Section */}
          <div className="photo">
            <img
              src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
              alt="User Profile"
              className="profile-pic"
            />
            <button className="photo-icon">
              <FeatherIcon icon="edit" />
            </button>
          </div>

          {/* User Info Section */}
          <div className="info">
            <button className="info-icon">
              <FeatherIcon icon="edit" />
            </button>
            <p className="name">{user.name}</p>
            <p className="email">{user.email}</p>
          </div>
          <div className="dash" />
        </div>

        {/* Logout Button */}
        <div className="logout">
          <button className="logout-button">
            <p>LogOut</p>
            <FeatherIcon icon="log-out" color="crimson" size={20} />
          </button>
        </div>
      </aside>

      <div className='outer-container'>
        <div className='activities'>
          <div className='cards'>
            <p className='heading'>Carbon Emission reports</p>
            <div className='content'>
              {pdfs.length === 0 ? (
                <p>No report yet.</p>
              ) : (
                <div className="pdf-cards">
                  {pdfs.map((pdf, index) => (
                    <div key={index} className="pdf-card">
                      <img
                        src="https://blog.idrsolutions.com/app/uploads/2020/10/pdf-1.png"
                        alt="PDF Thumbnail"
                        className="pdf-thumbnail"
                      />
                      <p className="pdf-created-at">
                        Created: {formatDate(pdf.createdAt)}
                      </p>
                      <div className="pdf-buttons">
                        <button className="pdf-button" onClick={() => handleView(pdf.url)}>
                          <FeatherIcon icon="eye" size={16} /> View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='cards'>
            <p className='heading'>Purchased products</p>
            <div className='content'>No purchase yet.</div>
          </div>
          <div className='cards'>
            <p className='heading'>Blog posts</p>
            <div className='content'>
              {posts.length === 0 ? (
                <p>No post yet.</p>
              ) : (
                <div className="post-cards">
                  {posts.map((post, index) => (
                    <div key={index} className="post-card">
                      <img
                        src={post.image || 'https://via.placeholder.com/100'}
                        alt="Post Thumbnail"
                        className="post-thumbnail"
                      />
                      <div className="post-content">
                        <div className="post-info">
                          <p className="post-stats">
                            <FeatherIcon icon="heart" size={14} /> {post.likes?.length || 0} Likes
                          </p>
                          <p className="post-stats">
                            <FeatherIcon icon="message-circle" size={14} /> {post.comments?.length || 0} Comments
                          </p>
                        </div>
                        <div className="post-buttons">
                          <button className="post-button" onClick={() => handleViewPost(post.url)}>
                            <FeatherIcon icon="eye" size={16} /> View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card component
const Card = ({ icon, title, description }) => (
  <div className="card">
    <h2>
      <FeatherIcon icon={icon} size={20} /> {title}
    </h2>
    <p>{description}</p>
  </div>
);

export default Dashboard;