import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/books");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setBooksData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Best Selling Books</h1>
      <ul className="book-list">
        {booksData.map((book) => (
          <li key={book._id}>
            <Link to={`/details/${book._id}`}>
              <Card>
                <Card.Img
                  src={`http://localhost:3000/${book.image}`}
                  alt={book.title}
                  style={{ width: "300px", height: "400px" }}
                  
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "12px", textAlign: "center", fontWeight: "bold" }}>
                    {book.title}
                  </Card.Title>
                  <Card.Title style={{ fontSize: "12px", textAlign: "center", fontWeight: "bold" }}>
                    {book.author}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
