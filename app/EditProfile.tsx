import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProfile = ({ userId }: { userId: number }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',

  });

  const [message, setMessage] = useState('');

  // Fetch user details
  useEffect(() => {
    axios.get(`/api/alumni/${userId}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error("Failed to load profile", err));
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.put(`/api/alumni/${userId}`, formData)
      .then(res => setMessage("Profile updated successfully"))
      .catch(err => {
        console.error("Update failed", err);
        setMessage("Error updating profile");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
