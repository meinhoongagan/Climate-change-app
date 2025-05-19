
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import Face from '@mui/icons-material/Face';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

// Utility function to show time ago
function getTimeAgo(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays >= 1) {
    return created.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  } else if (diffHours >= 1) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  }
}

// CommentsList component
const CommentsList = ({ comments }) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!comments || comments.length === 0) {
    return (
      <Typography sx={{ fontSize: 'sm', color: 'text.tertiary', ml: 4 }}>
        No comments yet.
      </Typography>
    );
  }

  const visibleComments = showAll ? comments : comments.slice(0, 2);

  return (
    <Box sx={{ mt: 1, ml: 4 }}>
      {visibleComments.map((c, idx) => (
        <Box key={c._id || idx} sx={{ mb: 0.5 }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: 'sm', display: 'inline' }}>
            {c.user?.name || 'User'}:
          </Typography>
          <Typography sx={{ fontSize: 'sm', display: 'inline', ml: 1 }}>
            {c.content}
          </Typography>
        </Box>
      ))}
      {comments.length > 2 && (
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: 'sm', color: 'primary.main', mt: 0.5 }}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Show less' : `Show ${comments.length - 2} more`}
        </Link>
      )}
    </Box>
  );
};

const CommunityCard = ({
  name,
  authorid,
  LikesCount,
  title,
  description,
  CreationDate,
  blogId,
  comments = [],
  imageUrl
}) => {
  const user = useSelector((state) => state.UserStates.user);
  const currentuserid = user._id;
  const [commentContent, setcommentContent] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [localComments, setLocalComments] = useState(comments);
  const [isLiked, setisLiked] = useState(true);

  const handleLiked = async () =>{
    try {
      const res = await axios.post(`http://localhost:8000/api/posts/like/${blogId}`,{userid:currentuserid});
      console.log("liked",res.data);
      setisLiked(res.data.Liked);
    } catch (error) {
      console.log(error);
    }
  }

  // If comments prop changes, update local state
  React.useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleCommentSubmit = async () => {
    const data = {
      userid: currentuserid,
      content: commentContent
    };
    try {
      const res = await axios.post(`http://localhost:8000/api/posts/comment/${blogId}`, data);
      setcommentContent('');
      // Add new comment to local state for instant UI update
      setLocalComments((prev) => [
        ...prev,
        {
          _id: res.data?.data?._id || Math.random().toString(),
          user: { name: user.name },
          content: commentContent
        }
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: {
          xs: '100%',  // phones
          sm: 300,     // tablets
          md: 400,     // desktops
          lg: 500,     // large screens
        },
        '--Card-radius': (theme) => theme.vars.radius.xs,
        mt: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            },
          }}
        >
          <Avatar
            size="sm"
            src="/static/logo.png"
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          >
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <Typography sx={{ fontWeight: 'lg' }}>{name}</Typography>
        {currentuserid === authorid ? (
          <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
            <MoreHoriz />
          </IconButton>
        ) : (
          ""
        )}
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img src={imageUrl} alt="here in an image" loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
        <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm" onClick={handleLiked}>
            
            {isLiked ? (
            <Favorite sx={{ color: 'red' }} />
              ) : ( 
            <FavoriteBorder />
            )}

          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
        </Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          textColor="text.primary"
          sx={{ fontSize: 'sm', fontWeight: 'lg' }}
        >
          {`${LikesCount} Likes`}
        </Link>
        <Typography sx={{ fontSize: 'sm' }}>
          <Link
            component="button"
            color="neutral"
            textColor="text.primary"
            sx={{ fontWeight: 'lg' }}
          >
            {title}
          </Link>{' '}<br />
          {description}
        </Typography>
        <Link
          component="button"
          underline="none"
          startDecorator="…"
          sx={{ fontSize: 'sm', color: 'text.tertiary' }}
        >
          more
          {/* todo to hide content if length is big */}
        </Link>
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
        >
          {getTimeAgo(CreationDate)}
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          value={commentContent || ""}
          sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
          onChange={(e) => setcommentContent(e.target.value)}
        />
        <Link
          underline="none"
          role="button"
          onClick={handleCommentSubmit}
          disabled={!commentContent || commentContent.trim() === ""}
        >
          Post
        </Link>
      </CardContent>
      <CardContent sx={{ pt: 0 }}>
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: 'sm', color: 'primary.main', mt: 1 }}
          onClick={() => setShowComments((prev) => !prev)}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Link>
        {showComments && <CommentsList comments={localComments} />}
      </CardContent>
    </Card>
  );
};

export default CommunityCard;