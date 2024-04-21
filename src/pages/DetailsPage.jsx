import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import "../styles/Detail.css";
import favorite from "../images/favorite.png";
import share from "../images/share.png";

const BookDetails = () => {
  const param = useParams();
  console.log(param.id);

  const [book, setBook] = useState(null);
  const apiUrl = `http://localhost:3000/api/books/${param.id}`;

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
    <>
      <Layout />
      {book ? (
        <>
          <div className="detail-container">
            <div className="block">
              <img
                src={`http://localhost:3000/${book.image}`}
                alt={book.title}
                className="detail-image"
              />
              <div className="sub-block">
                <div className="block2">
                  <h1 className="title">{book.title}</h1>
                  <h6 className="author">{book.author}</h6>
                </div>
                <div className="block3">
                  <h2>{book.price}</h2>
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
                    <button className="buy-btn">ADD TO CART</button>
                  </div>
                </div>
                <div className="desc-setting">
                  <h2>Description</h2>
                  <div style={{ display: "flex" }}>
                    <div>
                      {readMore ? (
                        <p className="desc">
                          {book.description.slice(0, 100)}...
                        </p>
                      ) : (
                        <p className="desc">{book.description}</p>
                      )}
                      <div onClick={handleReadMore} className="read">
                        {readMore ? "View More" : "View Less"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {/*  <div>
        {book ? (
          <>
            <div className="detail-container">
              <img
                src={`http://localhost:3000/${book.image}`}
                alt={book.title}
                className="image-container"
              />
              <h2 style={{ color: "blue", fontWeight: "bold" }}>
                {book.title}
              </h2>
              <h3 style={{ color: "grey", fontWeight: "bold" }}>
                By {book.author}
              </h3>
              <h6>{book.type}</h6>
            </div>
            <hr style={{marginLeft:'20px',marginRight:'20px',height:'2px',backgroundColor:'black'}}/>
            <div style={{ padding: "10px 20px", textAlign: "justify" }}>
              <div
                style={{
                  width: "100%",
                  margin: "auto",
                  outline: "black",
                  border: "1px solid black",
                  padding:'20px',
                  borderRadius:'10px'
                }}
              >
                <h2 style={{ color: "violet",textDecoration:'underline' }}>Description</h2>
                <p style={{ fontSize: "20px", color: "blue", width:'50%'}}>
                  {book.description}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
    </>
  );
};

export default BookDetails;
