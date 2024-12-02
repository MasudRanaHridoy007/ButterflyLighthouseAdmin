import React, { useState, useEffect } from "react";
import axiosInstance from "../Axios/axiosinstance";
import styles from "../styles/TopLevelManagement.module.css"; // Import as a CSS module
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const TopLevelManagement = () => {
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    designation: "",
    image: null,
  });
  const [tableData, setTableData] = useState([]); // State to hold table data
  const [editMode, setEditMode] = useState(false); // State to track if editing

  // Fetch data from backend on component mount
  const fetchTableData = async () => {
    try {
      const response = await axiosInstance.get("/fetch_management"); // Replace with your API endpoint
      setTableData(response.data); // Populate table data with fetched data
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchTableData(); // Fetch data on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("designation", formData.designation);
    if (formData.image) formDataObj.append("m_image", formData.image);

    try {
      if (editMode) {
        // Update existing item
        await axiosInstance.put(`/update_management/${formData.id}`, formDataObj); // Replace with your API endpoint
      } else {
        // Add new item
        await axiosInstance.post("/add_management", formDataObj); // Replace with your API endpoint
      }

      // Refetch updated table data
      await fetchTableData();

      // Reset form and close dialog
      setShowForm(false);
      setFormData({ id: null, name: "", designation: "", image: null });
      setEditMode(false);
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  const handleEdit = (row) => {
    setFormData({ ...row, image: null }); // Reset image input for editing
    setEditMode(true);
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/delete_management/${id}`); // Replace with your API endpoint

      // Refetch updated table data
      await fetchTableData();
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Hide form if Cancel is clicked
    setEditMode(false); // Exit edit mode
    setFormData({ id: null, name: "", designation: "", image: null }); // Clear form data
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Top Level Management</h2>

      {/* Add New Button */}
      <Button
        variant="contained"
        color="primary"
        className={styles.addButton}
        onClick={() => setShowForm(true)} // Show the form when clicked
      >
        Add New
      </Button>

      {/* Show Form Dialog if showForm is true */}
      {showForm && (
        <Dialog open={showForm} onClose={handleCancel}>
          <DialogTitle>{editMode ? "Edit Item" : "Add New Item"}</DialogTitle>
          <DialogContent>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <TextField
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <label>Designation</label>
                <TextField
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className={styles.formGroup}>
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
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

      {/* Table to display data */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {row.image ? (
                  <img src={row.image} alt="Management" className={styles.memberImage} />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{row.name}</td>
              <td>{row.designation}</td>
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
                  onClick={() => handleDelete(row.id)}
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

export default TopLevelManagement;
