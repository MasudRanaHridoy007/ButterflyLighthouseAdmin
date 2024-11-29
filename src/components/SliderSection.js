import React, { useState } from 'react';
import styles from '../styles/SliderSection.module.css';

const SliderSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [buttonText, setButtonText] = useState('');
  const [buttonColor, setButtonColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [link, setLink] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newEntry = {
        image: selectedFile,
        text: buttonText,
        color: buttonColor,
        textColor: textColor,
        link: link,
      };
      setUploadedImages([...uploadedImages, newEntry]);
      setSelectedFile(null); // Clear the preview after uploading
    }
  };

  const handleDelete = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
  };

  const handleSaveButtonText = () => {
    // Here you can save the button text to the currently uploaded image entry
  };

  const handleSaveButtonColor = () => {
    // Here you can save the button color to the currently uploaded image entry
  };

  const handleSaveTextColor = () => {
    // Here you can save the button text color to the currently uploaded image entry
  };

  const handleSaveLink = () => {
    // Here you can save the link to the currently uploaded image entry
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

      {/* Always Visible Fields (Button Text, Color, Text Color, Link) */}
      <div className={styles.fieldsSection}>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Enter Button Text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className={styles.textField}
          />
          <button onClick={handleSaveButtonText} className={styles.saveButton}>Save Text</button>
        </div>

        <div className={styles.field}>
          <label>
            Button Color:
            <input
              type="color"
              value={buttonColor}
              onChange={(e) => setButtonColor(e.target.value)}
              className={styles.colorPicker}
            />
          </label>
          <button onClick={handleSaveButtonColor} className={styles.saveButton}>Save Color</button>
        </div>

        <div className={styles.field}>
          <label>
            Text Color:
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className={styles.colorPicker}
            />
          </label>
          <button onClick={handleSaveTextColor} className={styles.saveButton}>Save</button>
        </div>

        <div className={styles.field}>
          <input
            type="url"
            placeholder="Enter Button Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={styles.textField}
          />
          <button onClick={handleSaveLink} className={styles.saveButton}>Save Link</button>
        </div>

        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} className={styles.uploadButton}>
            Upload
          </button>
        </div>
      </div>

      {/* Uploaded Images Table */}
      <div className={styles.tableSection}>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadedImages.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Serial number column */}
                <td>
                  <img src={entry.image} alt={`Uploaded ${index + 1}`} className={styles.tableImage} />
                </td>
                <td>
                  <button onClick={() => handleDelete(index)} className={styles.deleteButton}>
                    Delete
                  </button>
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
