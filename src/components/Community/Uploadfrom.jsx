import React, { useState, useEffect } from 'react';
import './UploadForm.css';
import { useSelector } from 'react-redux';

const UploadForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const user = useSelector((state) => state.UserStates.user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        image: null, // Don't prefill file input
      });
    }
  }, [initialData]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Convert image file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageBase64 = initialData.image || '';
    if (formData.image) {
      imageBase64 = await toBase64(formData.image);
    }

    const data = {
      title: formData.title,
      description: formData.description,
      image: imageBase64,
      author: user._id,
    };

    try {
      await onSubmit(data);
      setFormData({ title: '', description: '', image: null });
    } catch (error) {
      alert('Error uploading post');
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form-container">
      <h1 className="upload-form-title">{isEdit ? 'Update Post' : 'Upload Post'}</h1>

      <label className="upload-form-label">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="upload-form-input"
      />

      <label className="upload-form-label">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        className="upload-form-textarea"
      />

      <label className="upload-form-label">Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="upload-form-file"
      />
      {isEdit && initialData.image && (
        <img src={initialData.image} alt="Current" style={{ width: 100, marginTop: 8 }} />
      )}

      <button type="submit" className="upload-form-button" disabled={loading}>
        {loading ? (isEdit ? 'Updating...' : 'Uploading...') : (isEdit ? 'Update' : 'Upload')}
      </button>
    </form>
  );
};

export default UploadForm;