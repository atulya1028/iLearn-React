import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import reading from "../images/reading.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [booksData, setBooksData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    console.log("Width: ", window.innerWidth);
  }, []);

  return (
    <>
      <div>
        <div style={{ paddingTop: "50px" }} />
        <span className="search-holder">
          <input
            type="text"
            className="search-box"
            placeholder="Search by books, author or title"
          />
          <button className="searchBtn">
            {" "}
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </span>
        <div style={{ paddingTop: "20px" }} />
        <div className="banner">
          <div className="container-fluid">
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="post">
                <div
                  style={{
                    fontFamily: "Pacifico",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#0077b6",
                    textAlign: "justify",
                  }}
                >
                  {isMobile ? (
                    <div style={{ width: "70%" }}>
                      We sell book and attract people with different thinkings
                      while reading
                    </div>
                  ) : (
                    <div style={{ width: "50%",fontSize:'35px'}}>
                      We sell book and attract people with different thinkings
                      while reading
                    </div>
                  )}
                </div>
                {isMobile ? (
                  <img
                    src={reading}
                    alt=""
                    width="50%"
                    height="70%"
                    style={{ borderRadius: "10px" }}
                  />
                ) : (
                  <img
                    src={reading}
                    alt=""
                    width="15%"
                    height="70%"
                    style={{ borderRadius: "10px" }}
                  />
                )}
                
              </div>
              <div><button className="special-button">Special for you</button></div>
            </div>
          </div>
        </div>
        <h1 style={{ marginLeft: "20px", marginTop: "50px" }}>
          Best Selling Books
        </h1>
        <div style={{ paddingTop: "50px" }} />
        <ul className="book-list">
          {booksData.map((book) => (
            <li key={book._id}>
              <Link to={`/details/${book._id}`}>
                <Card className="box-card">
                  <Card.Img
                    src={`http://localhost:3000/${book.image}`}
                    alt={book.title}
                    className="card-image"
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {book.title}
                    </Card.Title>
                    <Card.Title
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {book.author}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
