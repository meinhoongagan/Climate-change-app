import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisV, faPaperPlane, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setBlogs } from '../../redux/UserSlice.js';
import API_ENDPOINT from '../../config/api.js';

function getTimeAgo(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 1) return created.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  if (diffHours >= 1) return `${diffHours}h ago`;
  return `${diffMins}m ago`;
}

const CommunityCard = ({
  name,
  authorid,
  LikesCount,
  title,
  description,
  CreationDate,
  blogId,
  comments = [],
  imageUrl,
  user,
  likedUsers = [],
}) => {
  const currentuserid = user?._id;
  const [commentContent, setCommentContent] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [localComments, setLocalComments] = useState(comments);
  const [showActions, setShowActions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(LikesCount);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (likedUsers && Array.isArray(likedUsers) && currentuserid) {
      setIsLiked(likedUsers.includes(currentuserid));
    }
    setLikeCount(LikesCount);
  }, [likedUsers, currentuserid, LikesCount]);

  useEffect(() => { setLocalComments(comments); }, [comments]);

  const handleLiked = async () => {
    setIsLiked(p => !p);
    setLikeCount(p => (isLiked ? p - 1 : p + 1));
    try {
      await axios.post(`${API_ENDPOINT}/api/posts/like/${blogId}`, { userid: currentuserid });
    } catch {
      setIsLiked(p => !p);
      setLikeCount(p => (isLiked ? p + 1 : p - 1));
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;
    const data = { userid: currentuserid, content: commentContent };
    try {
      const res = await axios.post(`${API_ENDPOINT}/api/posts/comment/${blogId}`, data);
      setLocalComments(prev => [...prev, {
        _id: res.data?.data?._id || Math.random().toString(),
        user: { name: user.name },
        content: commentContent,
      }]);
      setCommentContent('');
    } catch (e) { console.log(e); }
  };

  const handleUpdate = () => { navigate(`/update-post/${blogId}`); setShowActions(false); };

  const handleDelete = async () => {
    setShowActions(false);
    try {
      await axios.delete(`${API_ENDPOINT}/api/posts/delete-post/${blogId}`);
      const res = await axios.get(`${API_ENDPOINT}/api/posts/all-post`);
      dispatch(setBlogs(res.data.data));
      navigate('/community');
    } catch (e) { console.log(e); }
  };

  return (
    <article className="community-card">
      {/* Header */}
      <div className="cc-header">
        <div className="cc-avatar">{name?.charAt(0).toUpperCase()}</div>
        <div className="cc-meta">
          <span className="cc-author">{name}</span>
          <span className="cc-time">{getTimeAgo(CreationDate)}</span>
        </div>
        {currentuserid === authorid && (
          <div className="cc-menu">
            <button className="cc-menu-btn" onClick={() => setShowActions(p => !p)}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {showActions && (
              <div className="cc-dropdown">
                <button className="cc-dropdown-item cc-edit" onClick={handleUpdate}>
                  <FontAwesomeIcon icon={faPen} /> Edit
                </button>
                <button className="cc-dropdown-item cc-delete" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="cc-image-wrap">
          <img src={imageUrl} alt={title} className="cc-image" loading="lazy" />
        </div>
      )}

      {/* Actions */}
      <div className="cc-actions">
        <button className={`cc-like-btn${isLiked ? ' liked' : ''}`} onClick={handleLiked}>
          <FontAwesomeIcon icon={faHeart} />
          <span>{likeCount}</span>
        </button>
        <button className="cc-comment-toggle" onClick={() => setShowComments(p => !p)}>
          <FontAwesomeIcon icon={faComment} />
          <span>{localComments.length}</span>
        </button>
      </div>

      {/* Body */}
      <div className="cc-body">
        <p className="cc-title">{title}</p>
        <p className="cc-desc">{description}</p>
      </div>

      {/* Comment input */}
      <div className="cc-comment-form">
        <input
          className="cc-comment-input"
          placeholder="Add a comment…"
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCommentSubmit()}
        />
        <button
          className="cc-comment-post"
          onClick={handleCommentSubmit}
          disabled={!commentContent.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>

      {/* Comments list */}
      {showComments && (
        <div className="cc-comments">
          {localComments.length === 0 ? (
            <p className="cc-no-comments">No comments yet. Be the first!</p>
          ) : (
            localComments.map((c, i) => (
              <div key={c._id || i} className="cc-comment">
                <span className="cc-comment-author">{c.user?.name || 'User'}</span>
                <span className="cc-comment-text">{c.content}</span>
              </div>
            ))
          )}
        </div>
      )}
    </article>
  );
};

export default CommunityCard;
