import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios/axiosinstance";
import styles from "../styles/SliderSection.module.css";

const SliderSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [title, setTitle] = useState("");
  const [titleColor, setTitleColor] = useState("#000000");
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [link, setLink] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // For edit preview
  const [editId, setEditId] = useState(null); // To track edit mode
  const [oldImage, setOldImage] = useState(null); // Preserve old image

  // Fetch slider items on component load
  useEffect(() => {
    fetchSliderItems();
  }, []);

  const fetchSliderItems = async () => {
    try {
      const response = await axiosInstance.get("/fetch_slider");
      setUploadedImages(response.data || []); // Default to an empty array if no data
    } catch (error) {
      console.error("Error fetching slider items:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
    setPreviewImage(file ? URL.createObjectURL(file) : oldImage); // Show new or old image
  };

  const handleUpload = async () => {
    if (title && buttonText && link) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("title_color", titleColor);
      formData.append("button_text", buttonText);
      formData.append("button_background", buttonColor);
      formData.append("button_txt_color", textColor);
      formData.append("btn_url", link);

      if (selectedFile) {
        formData.append("image", selectedFile); // Include new image if selected
      } else if (oldImage) {
        formData.append("old_image", oldImage); // Send old image path if no new image
      }

      try {
        if (editId) {
          // Update existing slider item
          const response = await axiosInstance.put(`/update_slider/${editId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setUploadedImages((prev) => 
            prev.map((item) =>
              item.t_id === editId
                ? { ...item, ...response.data.slider } // Merge updated values
                : item
            )
          );
          
        } else {
          // Add new slider item
          const response = await axiosInstance.post("/add_slider", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setUploadedImages([...uploadedImages, response.data.slider]);
        }

        resetForm();
      } catch (error) {
        console.error("Error uploading/updating slider item:", error);
      }
    } else {
      alert("Please fill all fields and select an image.");
    }
  };

  const handleEdit = (item) => {
    if (!item) return;
    // Populate form fields with the selected item's data for editing
    setEditId(item.t_id);
    setTitle(item.title);
    setTitleColor(item.title_color);
    setButtonText(item.button_text);
    setButtonColor(item.button_background);
    setTextColor(item.button_txt_color);
    setLink(item.btn_url);
    setPreviewImage(item.t_image); // Set existing image for preview
    setOldImage(item.t_image); // Preserve old image in case no new image is uploaded
    setSelectedFile(null); // Ensure a new file is not required for editing
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/delete_slider/${id}`);
      setUploadedImages(uploadedImages.filter((item) => item && item.t_id !== id));
    } catch (error) {
      console.error("Error deleting slider item:", error);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTitle("");
    setTitleColor("#000000");
    setButtonText("");
    setButtonColor("#ffffff");
    setTextColor("#000000");
    setLink("");
    setPreviewImage(null);
    setOldImage(null);
    setEditId(null);
  };

  return (
    <div className={styles.sliderSection}>
      {/* Preview Box */}
      <div className={styles.previewBox}>
        {previewImage ? (
          <>
            <img
              src={previewImage}
              alt="Preview"
              className={styles.previewImage}
            />
            <h3 className={styles.previewTitle} style={{ color: titleColor }}>
              {title || "No Title Provided"}
            </h3>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.dynamicButton}
              style={{
                backgroundColor: buttonColor,
                color: textColor,
              }}
            >
              {buttonText || "Preview Button"}
            </a>
          </>
        ) : (
          <p className={styles.placeholderText}>No image selected</p>
        )}
      </div>

      {/* Form Section */}
      <div className={styles.formSection}>
        <form>
          <div className={styles.formFieldRow}>
            <div className={styles.formField}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="titleColor">Title Color</label>
              <input
                id="titleColor"
                type="color"
                value={titleColor}
                onChange={(e) => setTitleColor(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="buttonText">Button Text</label>
            <input
              id="buttonText"
              type="text"
              placeholder="Enter Button Text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="textColor">Button Text Color</label>
            <input
              id="textColor"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="buttonColor">Button Color</label>
            <input
                id="buttonColor"
                type="color"
                value={buttonColor}
                onChange={(e) => setButtonColor(e.target.value)}
              />
          </div>
          <div className={styles.formField}>
            <label htmlFor="link">Button Link</label>
            <input
              id="link"
              type="url"
              placeholder="Enter Button Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="uploadImage">Upload Image</label>
            <input id="uploadImage" type="file" onChange={handleFileChange} />
          </div>
        </form>
        <button onClick={handleUpload} className={styles.uploadButton}>
          {editId ? "Update" : "Submit"}
        </button>
        <button onClick={resetForm} className={styles.resetButton}>
          Reset
        </button>
      </div>

      {/* Uploaded Images Table */}
      <div className={styles.tableSection}>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Title</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {uploadedImages.map((entry, index) => {
              if (!entry) return null; // Skip undefined entries
              return (
                <tr key={entry.t_id}>
                  <td>{entry.t_id}</td>
                  <td style={{ color: entry.title_color }}>{entry.title}</td>
                  <td>
                    <img
                      src={entry.t_image}
                      alt={`Uploaded ${index + 1}`}
                      className={styles.tableImage}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(entry)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.t_id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SliderSection;
