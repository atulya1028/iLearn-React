import React, { useState, useEffect } from "react";
import {useParams } from "react-router-dom";
import "../styles/Detail.css";
import favorite from "../images/favorite.png";

const BookDetails = () => {
  const param = useParams();
  console.log(param.id);

  const [book, setBook] = useState(null);

  const apiUrl = `http://localhost:8080/api/books/${param.id}`;

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <div className="detail-container">
      {book ? (
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
                  ₹
                  {selectedValue === ""
                    ? parseFloat(book.price)
                    : `${(
                        parseFloat(book.price) * parseInt(selectedValue)
                      ).toFixed(2)}`}
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
                  <button className="cart-btn">ADD TO CART</button>
                  <button className="buy-btn">BUY NOW</button>
                </div>
              </div>
              <div className="desc-setting">
                <h2>Description</h2>
                <div style={{ display: "flex" }}>
                  <div>
                    {readMore ? (
                      <p className="desc">{book.description}</p>
                    ) : (
                      <p className="desc">
                        {book.description.slice(0, 100)}...
                      </p>
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
          </table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BookDetails;
