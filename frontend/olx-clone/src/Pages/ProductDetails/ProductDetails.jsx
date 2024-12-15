import './ProductDetails.css';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/products/${id}/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className="productmain">
        <div className="product_img">
          <div className="image_discription">
            <div className="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src={product.image_1}alt={product.title} />
                </div>
              </div>
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev" id="prev"></div>
              <div className="swiper-button-next" id="next"></div>
            </div>

            <div className="itemdescription">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          </div>

          <div className="product_details">
            <div className="box">
              <div className="price">
                <h3>₹{product.price}</h3>
                <div>
                  <p><i className="fa-solid fa-share-nodes"></i></p>
                  <p><i className="fa-regular fa-heart"></i></p>
                </div>
              </div>
              <p>{product.year} - {product.km_driven}Km</p>
              <p>{product.title}</p>
              <div className="location">
                <p>{product.state_name}</p>
                <p>{formatDistanceToNowStrict(parseISO(product.created_at))}</p>
              </div>
            </div>

            <div className="box" id="box2">
              <p className="Seller_description">Seller Description</p>
              <div className="seller_detail">
                <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651__340.png" alt="Seller Avatar" />
                <div>
                  <h2>Dr Naik</h2>
                  <p>Member since Nov 2021</p>
                </div>
              </div>
              <a href="chat.html">Chat with Seller</a>
            </div>

            <div className="box" id="box3">
              <h2>Posted in</h2>
              <p>Bandra East, Mumbai</p>
              <img src="https://wp.inews.co.uk/wp-content/uploads/2019/06/google-maps.jpg" alt="Location Map" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
