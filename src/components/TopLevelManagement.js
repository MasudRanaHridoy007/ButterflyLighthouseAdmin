import React, { useState } from "react";
import "../styles/TopLevelManagement.module.css"; // Ensure the CSS file is imported
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
    description: "",
    image: null,
  });
  const [tableData, setTableData] = useState([]); // State to hold table data
  const [editMode, setEditMode] = useState(false); // State to track if editing

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      // Update an existing row
      setTableData((prev) =>
        prev.map((row) =>
          row.id === formData.id ? { ...row, ...formData } : row
        )
      );
      setEditMode(false);
    } else {
      // Add a new row
      const newRow = {
        id: tableData.length + 1, // Assign a unique ID (could be generated differently)
        name: formData.name,
        description: formData.description,
        image: formData.image,
      };

      setTableData([...tableData, newRow]);
    }

    setShowForm(false); // Close the form
    setFormData({ id: null, name: "", description: "", image: null }); // Clear form data
  };

  const handleEdit = (row) => {
    setFormData(row); // Populate form data with row details
    setEditMode(true);
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = (id) => {
    setTableData((prev) => prev.filter((row) => row.id !== id)); // Remove row with the specified ID
  };

  const handleCancel = () => {
    setShowForm(false); // Hide form if Cancel is clicked
    setEditMode(false); // Exit edit mode
    setFormData({ id: null, name: "", description: "", image: null }); // Clear form data
  };

  return (
    <div className="container">
      <h2 className="title">Top Level Management</h2>

      {/* Add New Button */}
      <Button
        variant="contained"
        color="primary"
        className="addButton"
        onClick={() => setShowForm(true)} // Show the form when clicked
      >
        Add New
      </Button>

      {/* Show Form Dialog if showForm is true */}
      {showForm && (
        <Dialog open={showForm} onClose={handleCancel}>
          <DialogTitle>{editMode ? "Edit Item" : "Add New Item"}</DialogTitle>
          <DialogContent>
            <form className="form" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label>Name</label>
                <TextField
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className="formGroup">
                <label>Description</label>
                <TextField
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div className="formGroup">
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
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.description}</td>
              <td>
                {row.image ? (
                  <img
                    src={URL.createObjectURL(row.image)}
                    alt="image"
                    className="memberImage"
                    style={{ width: "300px", height: "300px", objectFit: "cover" }}
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
