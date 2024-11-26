import React, { useState } from 'react';
import styles from '../styles/SliderSection.module.css';

const SliderSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      setUploadedImages([...uploadedImages, selectedFile]);
      setSelectedFile(null); // Clear preview after upload
    }
  };

  // Handle image delete
  const handleDelete = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
  };

  return (
    <div className={styles.sliderSection}>
      {/* Image Preview Section */}
      <div className={styles.previewSection}>
        {selectedFile ? (
          <img src={selectedFile} alt="Preview" className={styles.previewImage} />
        ) : (
          <p>No image selected</p>
        )}
      </div>

      {/* Upload Section */}
      <div className={styles.uploadSection}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* Uploaded Images Table */}
      <div className={styles.tableSection}>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadedImages.map((image, index) => (
              <tr key={index}>
                <td>
                  <img src={image} alt={`Uploaded ${index + 1}`} className={styles.tableImage} />
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SliderSection;
