import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import books from "../images/books.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";

export default function Home() {
  const [booksData, setBooksData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  const [showMore,setShowMore] = useState(false);

  const toggleShowMore = ()=>{
    setShowMore(!showMore);
  }

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
        const response = await fetch("http://localhost:8080/api/books");
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
    
      <div className="nav-container">
        <div className="banner">
          <div className="device-container">
            {isMobile ? (
              <p className="mobile-container">
                Discover diverse perspectives and ideas through our curated
                collection of books. We invite you to explore new worlds,
                challenge your thoughts, and connect with others through the
                transformative power of books.
              </p>
            ) : (
              <p className="notebook-container">
                Discover diverse perspectives and ideas through our curated
                collection of books. We invite you to explore new worlds,
                challenge your thoughts, and connect with others through the
                transformative power of books.
              </p>
            )}
            {isMobile ? (
              <>
              <button className="m-special-button">
                Special for you{" "}
                <FontAwesomeIcon
                  icon={faCircleRight}
                  size="1.5x"
                  color="green"
                />
              </button>
              {isMobile ? (
            <img src={books} alt="books" className="mobile-img" />
          ) : (
            <></>
          )}
              </>
            ) : (
              <button className="special-button">
                Special for you{" "}
                <FontAwesomeIcon
                  icon={faCircleRight}
                  size="1.5x"
                  color="green"
                />
              </button>
            )}
          </div>
        {!isMobile ? <img src={books} alt="books" className="notebook-img" /> : <></>}
        </div>
        <div className="heading">
          <h4>Best Selling Books</h4>
          <div onClick={toggleShowMore} className="view">
            {showMore ? "View Less" : 'View More'}
          </div>
        </div>
        <hr style={{marginLeft:'20px',marginRight:'20px'}}/>
        <div style={{ paddingTop: "50px"}} />
        {showMore ? 
        <ul className="book-list">
          {booksData.map((book) => (
            <li key={book._id}>
              <Link to={`/details/${book._id}`} className="card-text">
              <div className="box-card">
                  <img
                    src={`http://localhost:8080/${book.image}`}
                    alt={book.title}
                    className="card-image"
                  />
                     <div>
                      {book.title}
                    </div>
                    <div>
                      {book.author}
                    </div>
                    <div>
                      ₹{book.price}
                    </div>
                </div>
              </Link>
            </li>
          ))}
        </ul> 
        :
         <ul className="book-list">
          {booksData.slice(0,4).map((book) => (
            <li key={book._id}>
              <Link to={`/details/${book._id}`} className="card-text">
                <div className="box-card">
                  <img
                    src={`http://localhost:8080/${book.image}`}
                    alt={book.title}
                    className="card-image"
                  />
                     <div>
                      {book.title}
                    </div>
                    <div>
                      {book.author}
                    </div>
                    <div>
                      ₹{book.price}
                    </div>
                </div>
              </Link>
              <button className="add-cart">Add to cart</button>
            </li>
          ))}
        </ul>}
        <div style={{height:'50px'}}/>
      </div>
  );
}
