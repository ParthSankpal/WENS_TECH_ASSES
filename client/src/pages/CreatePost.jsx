import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase'; // Assuming you have set up Firebase configuration
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser, "Current User");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: 'uncategorized',
    
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSubmit = async (e) => {
    if (!file) {
      setImageUploadError('Please select an image to upload');
      return;
    }
    setUploading(true);
    setImageUploadError(false);

    try {
      const imageUrl = await storeImage(file);
      setFormData({ ...formData, image: imageUrl });
      setUploading(false);
    } catch (err) {
      setImageUploadError('Image upload failed (2 mb max per image)');
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      // Add your API request logic here to create a new post
      // For example:
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: currentUser._id }),
      });

      const data = await res.json();
      if(data) {

        setLoading(false);
        navigate('/'); // Navigate to the desired page after success
      }
    } catch (error) {
      setError('Failed to create post');
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-2xl mx-auto my-10">
      <h1 className="text-3xl font-semibold mb-5 ">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
          value={formData.content}
          onChange={handleChange}
        />
        
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={formData.category}
          onChange={handleChange}
        />
        <div className=' w-full sm:flex justify-between'>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            className=  " w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
        {imageUploadError && <p className="text-red-500">{imageUploadError}</p>}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
