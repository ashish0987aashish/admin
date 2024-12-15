import React, { useState, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';  // Import the icon you want
import axiosInstance from '../../utils/axiosinstance';

const ImageSelector = ({ onImageSelect }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setUploadError('');

      const formData = new FormData();
      formData.append('image', file);

      try {
        // Send the file to the backend API
        const response = await axiosInstance.post('/image-upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Get the image URL from the response and pass it to the parent component
        if (response.data.pimageUrl) {
          onImageSelect(response.data.pimageUrl);  // Pass image URL to parent
        }
      } catch (error) {
        setUploadError('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div className="image-selector w-60 h-60 bg-gradient-to-r from-blue-100 to-purple-100 border border-cyan-500 flex justify-center items-center cursor-pointer hover:scale-95 duration-75"
    onClick={handleIconClick}  
    >
      {/* Custom icon button to trigger the file input */}
      <FaUpload
        className="cursor-pointer text-3xl text-cyan-500"
      />
        
        
       <p className='text-lg font-medium text-cyan-500'>
         Upload Image 
       </p>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}  // Attach the ref to the file input
        onChange={handleImageChange}
        className="file-input hidden" // Hide the input element
      />
      {isUploading && <p>Uploading...</p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
    </div>
  );
};

export default ImageSelector;
