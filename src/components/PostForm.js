import React, { useState } from 'react';
import '../App.css';

const PostForm = ({ threadId, setPosts }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post submission
    const newPost = { id: Date.now(), content, media: media ? { type: media.type, url: URL.createObjectURL(media) } : null };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setContent('');
    setMedia(null);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        required
      />
      <input type="file" onChange={handleMediaChange} />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
