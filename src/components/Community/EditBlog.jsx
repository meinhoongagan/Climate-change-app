import React, { useState, useEffect } from 'react';
import UploadForm from './Uploadfrom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const { blogid:id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts/get-post/${id}`);
        if (res.data.success) {
          setInitialData({
            title: res.data.data.title,
            description: res.data.data.description,
            image: res.data.data.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await axios.put(`http://localhost:8000/api/posts/update-post/${id}`, data);
      alert('Blog updated!');
      navigate('/community'); // Redirect after update
    } catch (error) {
      alert('Error updating blog');
      console.log(error);
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <main>
      <UploadForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isEdit={true}
      />
    </main>
  );
};

export default EditBlog;