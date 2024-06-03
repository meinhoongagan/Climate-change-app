import React, { useState } from 'react';
import '../App.css';

const PostForm = ({ threadId, setPosts }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [key, setKey] = useState(Date.now());

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { id: Date.now(), content, media: media ? { type: media.type, url: URL.createObjectURL(media) } : null };
    const storedPosts = JSON.parse(localStorage.getItem(`posts_${threadId}`)) || [];
    const updatedPosts = [...storedPosts, newPost];
    localStorage.setItem(`posts_${threadId}`, JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setContent('');
    setMedia(null);
    setKey(Date.now());
  };

  return (
    <form key={key} className="post-form" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts..."
        required
      />
      <input type="file" accept="image/*" onChange={handleMediaChange} />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
