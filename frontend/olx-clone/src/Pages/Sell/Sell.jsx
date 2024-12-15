import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import './Sell.css';

function Sell() {
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    km_driven: '',
    title: '',
    description: '',
    price: '',
    location: '',
    name: '',
    phone_number: '',
    images: {
      image1: null,
      image2: null,
      image3: null
    }
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        images: {
          ...formData.images,
          [name]: files[0]
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Get the token from localStorage
  const token = localStorage.getItem('accessToken');
  
  // If no token is found, show an error or redirect the user to login
  if (!token) {
    alert('Please log in to post a product');
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append('brand', formData.brand);
  formDataToSend.append('year', formData.year);
  formDataToSend.append('km_driven', formData.km_driven);
  formDataToSend.append('title', formData.title);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('price', formData.price);
  formDataToSend.append('location', formData.location);
  formDataToSend.append('name', formData.name);
  formDataToSend.append('phone_number', formData.phone_number);

  // Append images only if they are not null or undefined
  if (formData.images.image1) {
    formDataToSend.append('image1', formData.images.image1);
  }
  if (formData.images.image2) {
    formDataToSend.append('image2', formData.images.image2);
  }
  if (formData.images.image3) {
    formDataToSend.append('image3', formData.images.image3);
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/products/create/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Product created:', result);
      toast.success('Product posted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Optionally, show success message or redirect
    } else {
      const error = await response.json();
      console.error('Error creating product:', error);
      toast.error('Failed to post the product. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Handle errors accordingly
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div>
       <ToastContainer /> 
      {/* Header part */}
      <div className="header">
        <div className="center-header">
          <a href="sell.html" className="arrow">
            <i className="fa-solid fa-arrow-left"></i>
          </a>
        </div>
      </div>

      {/* Heading part */}
      <div className="post">
        <h1>POST YOUR AD</h1>
      </div>

      {/* Main section */}
      <form onSubmit={handleSubmit}>
        <div className="main">
          <h3>SELECTED CATEGORY</h3>

          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <a href="#" className="breadcrumbs__link">
                Bikes
              </a>
            </li>
            <li className="breadcrumbs__item">
              <a href="#" className="breadcrumbs__link">
                Motorcycles
              </a>
            </li>
          </ul>

          <hr />

          <h3 className="innertext">INCLUDE SOME DETAILS</h3>

          <div className="main__inner">
            <div className="inner__heading">
              <div className="inner__title">Brand *</div>
              <div className="inner__input">
                <select name="brand" onChange={handleChange} value={formData.brand}>
                  <option value=""></option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="Hero">Hero</option>
                  <option value="Honda">Honda</option>
                  <option value="KTM">KTM</option>
                  <option value="Royal Enfield">Royal Enfield</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="TVS">TVS</option>
                  <option value="Yamaha">Yamaha</option>
                  <option value="Other Brands">Other Brands</option>
                </select>
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">Year *</div>
              <div className="inner__input">
                <input type="number" name="year" onChange={handleChange} value={formData.year} />
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">KM driven *</div>
              <div className="inner__input">
                <input type="number" name="km_driven" onChange={handleChange} value={formData.km_driven} />
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">Ad title *</div>
              <div className="inner__input">
                <input type="text" name="title" onChange={handleChange} value={formData.title} />
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">Description *</div>
              <div className="inner__input">
                <textarea name="description" onChange={handleChange} value={formData.description}></textarea>
              </div>
            </div>

            <hr />

            <h3 className="innertext">SET A PRICE</h3>

            <div className="inner__heading">
              <div className="inner__title">Price *</div>
              <div className="inner__input">
                <input type="number" name="price" onChange={handleChange} value={formData.price} />
              </div>
            </div>

            <hr />

            <h3 className="innertext">UPLOAD UP TO 3 PHOTOS</h3>

            <div className="inner__heading">
              <div className="inner__title">Image 1</div>
              <div className="inner__input">
                <input type="file" name="image1" onChange={handleChange} />
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">Image 2</div>
              <div className="inner__input">
                <input type="file" name="image2" onChange={handleChange} />
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">Image 3</div>
              <div className="inner__input">
                <input type="file" name="image3" onChange={handleChange} />
              </div>
            </div>

            <hr />

            <h3 className="innertext">CONFIRM YOUR LOCATION</h3>

            <div className="inner__heading">
              <div className="inner__title">State *</div>
              <div className="inner__input">
                <select name="location" onChange={handleChange} value={formData.location}>
                  <option value=""></option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delh">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">Name</div>
              <div className="inner__input">
                <input type="text" name="name" onChange={handleChange} value={formData.name} />
              </div>
            </div>

            <div className="inner__heading">
              <div className="inner__title">Your phone number</div>
              <div className="inner__input">
                <input type="number" name="phone_number" onChange={handleChange} value={formData.phone_number} />
              </div>
            </div>

            <hr />

            <button id="post_btn" type="submit">Post Now</button>
          </div>
        </div>
      </form>

      {/* Footer part */}
      <div className="footer">
        <div>
          <p>
            <b>Other Countries </b> Pakistan - South Africa - Indonesia
          </p>
        </div>
        <div>
          <p>
            <b>Free Classifieds in India </b>. &copy; 2006-2022 OLX
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sell;
