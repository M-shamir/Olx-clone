import React, { useState } from 'react';

function Sell() {
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    fuel: '',
    transmission: '',
    no_of_owners: '',
    title: '',
    description: '',
    price: '',
    location: '',
    kilometer_driven: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve token from localStorage (ensure user is logged in)
      const token = localStorage.getItem('acessToken');
      if (!token) {
        setErrorMessage('Please login to create a product.');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Ensure the token includes "Bearer"
        },
        body: JSON.stringify(formData), // Send data as JSON
      });

      if (!response.ok) {
        throw new Error('Error occurred while creating product.');
      }

      const result = await response.json(); // Get the response from the backend

      if (result.success) {
        setSuccessMessage('Product created successfully!');
        setErrorMessage('');
        // Optionally, reset the form after successful submission
        setFormData({
          brand: '',
          year: '',
          fuel: '',
          transmission: '',
          no_of_owners: '',
          title: '',
          description: '',
          price: '',
          location: '',
          kilometer_driven: ''
        });
      } else {
        setErrorMessage('Failed to create product. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Create a Product</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fuel</label>
          <input
            type="text"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Transmission</label>
          <input
            type="text"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Owners</label>
          <input
            type="text"
            name="no_of_owners"
            value={formData.no_of_owners}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kilometer Driven</label>
          <input
            type="text"
            name="kilometer_driven"
            value={formData.kilometer_driven}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Sell;
