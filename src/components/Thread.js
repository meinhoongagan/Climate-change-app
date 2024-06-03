import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import '../App.css';

const Thread = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch thread data from local storage
    const storedThreads = JSON.parse(localStorage.getItem(`threads_${threadId}`)) || [];
    const currentThread = storedThreads.find(thread => thread.id === parseInt(threadId));
    setThread(currentThread);

    // Fetch posts in the thread from local storage
    const storedPosts = JSON.parse(localStorage.getItem(`posts_${threadId}`)) || [];
    setPosts(storedPosts);
  }, [threadId]);

  return (
    <div className="thread-container">
      {thread && (
        <>
          <h2>{thread.title}</h2>
          <p>{thread.content}</p>
          <div className="post-list">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <p>{post.content}</p>
                {post.media && (
                  <div className="media">
                    {post.media.type.startsWith('image') ? (
                      <img src={post.media.url} alt="Post media" />
                    ) : (
                      <video src={post.media.url} controls />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <PostForm threadId={threadId} setPosts={setPosts} />
        </>
      )}
    </div>
  );
};

export default Thread;
