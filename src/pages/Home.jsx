import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://freetestapi.com/api/v1/books"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setBooksData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  let desc = '';

  return (
    <div>
      <h1>Best Selling Books</h1>
      <ul className="book-list">
        {booksData.map((book) => (
          <li key={book.id}>
          <Link to="details">
          <Card>
              <Card.Img
                src={book.cover_image}
                alt={book.title}
                style={{ width: "300px", height: "200px" }}
              />
              <Card.Body>
                <Card.Title style={{fontSize:'12px', textAlign:'center', fontWeight:'bold'}}>{book.title}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
