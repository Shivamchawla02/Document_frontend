import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const UploadForm = () => {
  const navigate = useNavigate();
  const phone = localStorage.getItem('userPhone');

  const [studentName, setStudentName] = useState('');
  const [documents, setDocuments] = useState({
    profilePhoto: null,
    aadharCard: null,
    panCard: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    competitiveMarksheet: null,
  });

  useEffect(() => {
    if (!phone) return;

    const fetchName = async () => {
      try {
        const res = await axios.get(`https://servocci-backend.onrender.com/api/get-employee/${phone}`);
        setStudentName(res.data.name || 'Student');
      } catch (err) {
        console.error("Failed to fetch employee name", err);
        setStudentName("Student");
      }
    };
    fetchName();
  }, [phone]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setDocuments((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleUpload = async () => {
    if (!phone) {
      toast.error("Phone number missing. Please login again.");
      navigate('/');
      return;
    }

    // Check all documents are selected
    for (const key in documents) {
      if (!documents[key]) {
        toast.warn(`Please upload ${key.replace(/([A-Z])/g, ' $1')}`);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append('phone', phone);

      for (const key in documents) {
        formData.append(key, documents[key]);
      }

      toast.info("Uploading documents...");

      const res = await axios.post("https://servocci-backend.onrender.com/api/upload-document", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("All documents uploaded successfully!");

      setTimeout(() => {
        navigate('/admin-dashboard/employees');
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Try again.");
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Upload Documents for <span className="text-green-700">{studentName || 'Student'}</span>
        </h2>

        <div className="space-y-6">
          {[{ label: 'Profile Photo', name: 'profilePhoto' },
            { label: 'Aadhaar Card', name: 'aadharCard' },
            { label: 'PAN Card', name: 'panCard' }].map(({ label, name }) => (
            <div key={name}>
              <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">{label}</label>
              <input
                type="file"
                name={name}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png,.pdf"
              />
              {documents[name] && (
                <p className="text-sm text-gray-600 mt-1">{documents[name].name}</p>
              )}
            </div>
          ))}

          <h3 className="text-lg font-semibold text-gray-800 mt-6">Educational Certificates</h3>

          {[{ label: '10th Marksheet', name: 'tenthMarksheet' },
            { label: '12th Marksheet', name: 'twelfthMarksheet' },
            { label: 'Competitive Marksheet', name: 'competitiveMarksheet' }].map(({ label, name }) => (
            <div key={name}>
              <label className="block font-medium text-gray-700 mb-1 text-sm sm:text-base">{label}</label>
              <input
                type="file"
                name={name}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
                onChange={handleChange}
                accept=".jpg,.jpeg,.png,.pdf"
              />
              {documents[name] && (
                <p className="text-sm text-gray-600 mt-1">{documents[name].name}</p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleUpload}
          className="mt-8 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded text-sm sm:text-base"
        >
          Upload Documents
        </button>
      </div>
    </div>
  );
};

export default UploadForm;
