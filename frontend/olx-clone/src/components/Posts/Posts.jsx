
import './Post.css';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products,setProducts] = useState([])

  const [error,setError] = useState(null)
  const navigate =  useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 
        const response = await fetch('http://127.0.0.1:8000/api/products/products/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchProducts();
  }, []);
  const handleProductClick= (productId)=>{
      navigate(`/product-details/${productId}`)
  }
  
  return (
    <>
<div id="homepage_top_parent">
      <div id="homepage_top_parent_div">
        <span className="head_span">Fresh recommendations</span>
  
      </div>
      <div id="homepage_top_child">
  {products.length === 0 ? (
    <p>No products available</p>
  ) : (
    products.map((product) => (
      <div onClick={() => handleProductClick(product.id)} key={product.id}>
        <button className="head_button">
          <i className="fa-solid fa-heart fa-grey"></i>
        </button>
        <div>
          <img src={`http://127.0.0.1:8000${product.image_1}`} alt={product.title} />
        </div>
        <h3>{product.price}</h3>
        <p className="first_p">{product.title}</p>
        <p>{product.state_name}</p>
        <p>{formatDistanceToNowStrict(parseISO(product.created_at))}</p>
      </div>
    ))
  )}
</div>

    </div>
 </>
);
};

export default Posts;
