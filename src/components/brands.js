import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios/axiosinstance"; // Ensure Axios is configured for your backend
import styles from "../styles/brands.module.css"; // Use CSS modules
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Brands = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    b_id: null,
    title: "",
    details: "",
    url: "",
    b_image: null,
  });
  const [tableData, setTableData] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Fetch brands data from backend
  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get("/fetch_brands"); // Replace with your API endpoint
      setTableData(response.data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands(); // Fetch data on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("details", formData.details);
    formDataObj.append("url", formData.url);
    if (formData.b_image) formDataObj.append("b_image", formData.b_image);

    try {
      if (editMode) {
        // Update an existing brand
        await axiosInstance.put(`/update_brand/${formData.b_id}`, formDataObj); // Replace with your API endpoint
      } else {
        // Add a new brand
        await axiosInstance.post("/add_brand", formDataObj); // Replace with your API endpoint
      }

      // Refetch updated brands
      await fetchBrands();

      // Reset form and close dialog
      setShowForm(false);
      setFormData({ b_id: null, title: "", details: "", url: "", b_image: null });
      setEditMode(false);
    } catch (error) {
      console.error("Failed to submit brand:", error);
    }
  };

  const handleEdit = (row) => {
    setFormData({
      b_id: row.b_id,
      title: row.title,
      details: row.details,
      url: row.url,
      b_image: null, // Image input will be reset
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (b_id) => {
    try {
      await axiosInstance.delete(`/delete_brand/${b_id}`); // Replace with your API endpoint
      await fetchBrands(); // Refetch updated brands
    } catch (error) {
      console.error("Failed to delete brand:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setFormData({ b_id: null, title: "", details: "", url: "", b_image: null });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Brands</h2>
      <Button
        variant="contained"
        color="primary"
        className={styles.addButton}
        onClick={() => setShowForm(true)}
      >
        Add New
      </Button>

      {showForm && (
        <Dialog open={showForm} onClose={handleCancel}>
          <DialogTitle>{editMode ? "Edit Brand" : "Add New Brand"}</DialogTitle>
          <DialogContent>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Title</label>
                <TextField
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <label>Details</label>
                <TextField
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <label>URL</label>
                <TextField
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <label>Image</label>
                <input
                  type="file"
                  name="b_image"
                  onChange={(e) =>
                    setFormData({ ...formData, b_image: e.target.files[0] })
                  }
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {editMode ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Details</th>
            <th>URL</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.b_id}>
              <td>{row.b_id}</td>
              <td>{row.title}</td>
              <td>{row.details}</td>
              <td>
                {row.url ? (
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {row.url}
                  </a>
                ) : (
                  "No URL"
                )}
              </td>
              <td>
                {row.b_image ? (
                  <img
                    src={row.b_image} // Assume backend returns a full image URL
                    alt="brand"
                    className={styles.brandImage}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(row.b_id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Brands;
