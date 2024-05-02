// DetailsPage.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Detail.css";
import favorite from "../images/favorite.png";

const DetailsPage = () => {
  const param = useParams();
  const [book, setBook] = useState(null);
  const [selectedValue, setSelectedValue] = useState(1); 
  const [readMore, setReadMore] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); 

  const apiUrl = `http://localhost:8080/api/books/${param.title}`;

  const handleChange = (e) => {
    setSelectedValue(parseInt(e.target.value)); 
  };

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/add-to-cart/${param.title}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you have a token stored in localStorage
        },
        body: JSON.stringify({ price: book.price, quantity: selectedValue }), // Send the selected quantity
      });
      const data = await response.json();
      console.log(data); // You can handle the response here

      // Update state to show total price
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <div className="detail-container">
      {book && (
        <Link to={`/details/${book.title}`} className="link-to-details">
          View Details
        </Link>
      ) ? (
        <div>
          <div className="block">
            <img
              src={`http://localhost:8080/${book.image}`}
              alt={book.title}
              className="detail-image"
            />
            <div className="sub-block">
              <div className="block2">
                <h1 className="title">{book.title}</h1>
                <h6 className="author">{book.author}</h6>
              </div>
              <div className="block3">
                <h2>
                  ₹{parseFloat(book.price).toFixed(2)}
                </h2>
                <span>
                  <img src={favorite} alt="favorite" width={20} />
                </span>
              </div>
              <select
                value={selectedValue}
                onChange={handleChange}
                className="drop-down"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <div className="btn-setting">
                <div className="btn-handle">
                  <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
                  <button className="buy-btn">BUY NOW</button>
                </div>
              </div>
              <div className="desc-setting">
                <h2>Description</h2>
                <div style={{ display: "flex" }}>
                  <div>
                    {book.description ? (
                      <p className="desc">
                        {readMore ? book.description : book.description.slice(0, 100) + '...'}
                      </p>
                    ) : (
                      <p className="desc">Description not available</p>
                    )}
                    <div onClick={handleReadMore} className="read">
                      {readMore ? "View Less" : "View More"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 style={{ textDecoration: "underline" }}>Product Details</h3>
          <table>
            <tbody>
              <tr>
                <th>Title:</th>
                <td>{book.title}</td>
              </tr>
              <tr>
                <th>Author:</th>
                <td>{book.author}</td>
              </tr>
              <tr>
                <th>SKU:</th>
                <td>{book.sku}</td>
              </tr>
              <tr>
                <th>EAN:</th>
                <td>{book.ean}</td>
              </tr>
              <tr>
                <th>Language:</th>
                <td>{book.language}</td>
              </tr>
              <tr>
                <th>Binding:</th>
                <td>{book.binding}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DetailsPage;
