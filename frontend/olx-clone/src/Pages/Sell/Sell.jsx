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
    kilometer_driven:''
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

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

  // Handle image uploads
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === 'image1') {
        setImage1(files[0]);
      } else if (name === 'image2') {
        setImage2(files[0]);
      } else if (name === 'image3') {
        setImage3(files[0]);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object to send images and data
    const formDataToSend = new FormData();
    formDataToSend.append('brand', formData.brand);
    formDataToSend.append('year', formData.year);
    formDataToSend.append('fuel', formData.fuel);
    formDataToSend.append('transmission', formData.transmission);
    formDataToSend.append('no_of_owners', formData.no_of_owners);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('kilometer_driven', formData.kilometer_driven); // Added kilometer_driven
  
    // Append images to FormData
    if (image1) formDataToSend.append('image1', image1);
    if (image2) formDataToSend.append('image2', image2);
    if (image3) formDataToSend.append('image3', image3);
  
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
          'Authorization': `Bearer ${token}`, // Ensure the token includes "Bearer"
        },
        body: formDataToSend, // Send as FormData, not JSON
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
          kilometer_driven: '', // Reset kilometer_driven
        });
        setImage1(null);
        setImage2(null);
        setImage3(null);
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

        <div>
          <label>Image 1</label>
          <input type="file" name="image1" onChange={handleImageChange} required />
        </div>
        <div>
          <label>Image 2 (Optional)</label>
          <input type="file" name="image2" onChange={handleImageChange} />
        </div>
        <div>
          <label>Image 3 (Optional)</label>
          <input type="file" name="image3" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Sell;
