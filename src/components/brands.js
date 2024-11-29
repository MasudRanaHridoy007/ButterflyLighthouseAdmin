import React, { useState } from "react";
import "../styles/brands.module.css"; // CSS file for styling
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Brands = () => {
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [formData, setFormData] = useState({
    id: null,
    headline: "",
    description: "",
    image: null,
    link: "", // New link field
  });
  const [tableData, setTableData] = useState([]); // State for table data
  const [editMode, setEditMode] = useState(false); // Edit mode toggle

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      setTableData((prev) =>
        prev.map((row) =>
          row.id === formData.id ? { ...row, ...formData } : row
        )
      );
      setEditMode(false);
    } else {
      const newRow = {
        id: tableData.length + 1,
        headline: formData.headline,
        description: formData.description,
        image: formData.image,
        link: formData.link, // Include the link field
      };

      setTableData([...tableData, newRow]);
    }

    setShowForm(false);
    setFormData({ id: null, headline: "", description: "", image: null, link: "" });
  };

  const handleEdit = (row) => {
    setFormData(row);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTableData((prev) => prev.filter((row) => row.id !== id));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setFormData({ id: null, headline: "", description: "", image: null, link: "" });
  };

  return (
    <div className="container">
      <h2 className="title">Brands</h2>
      <Button
        variant="contained"
        color="primary"
        className="addButton"
        onClick={() => setShowForm(true)}
      >
        Add New
      </Button>

      {showForm && (
        <Dialog open={showForm} onClose={handleCancel}>
          <DialogTitle>{editMode ? "Edit Brand" : "Add New Brand"}</DialogTitle>
          <DialogContent>
            <form className="form" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label>Headline</label>
                <TextField
                  name="headline"
                  value={formData.headline}
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
                <label>Link</label>
                <TextField
                  name="link"
                  value={formData.link}
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

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Headline</th>
            <th>Description</th>
            <th>Link</th> {/* New Link column */}
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.headline}</td>
              <td>{row.description}</td>
              <td>
                {row.link ? (
                  <a href={row.link} target="_blank" rel="noopener noreferrer">
                    {row.link}
                  </a>
                ) : (
                  "No Link"
                )}
              </td>
              <td>
                {row.image ? (
                  <img
                    src={URL.createObjectURL(row.image)}
                    alt="brand"
                    className="brandImage"
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

export default Brands;
