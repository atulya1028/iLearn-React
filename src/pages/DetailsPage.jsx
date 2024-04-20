import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

const BookDetails = () => {
  const param = useParams();
  console.log(param.id);

  const [book, setBook] = useState(null);
  const apiUrl = `http://localhost:3000/api/books/${param.id}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiUrl]);

  return (
    <>
      <Layout />
      <div>
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
      </div>
    </>
  );
};

export default BookDetails;
