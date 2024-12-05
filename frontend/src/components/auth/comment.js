import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comment = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}/comments`);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments', err);
      }
    };

    fetchComments();
  }, [movieId]);

  const handleAddComment = async () => {
    try {
      await axios.post(`/api/movies/${movieId}/comments`, { text: newComment });
      setNewComment('');
      // Optionally refetch comments
    } catch (err) {
      console.error('Error adding comment', err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleAddComment}>Submit</button>
    </div>
  );
};

export default Comment;
