import React, { useEffect, useState } from "react";
import logo from "../images/iLearn.png";
import books from "../images/books.gif";
import { useNavigate } from "react-router-dom";
import "../styles/Payment.css";
import { Link } from "react-router-dom";
import "../styles/Payment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";

export const Payment = () => {

  const [shippingData,setShippingData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/cart/get-checkout",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have stored the token in localStorage
            },
          }
        );
        const data = await response.json();
        setCartItems(data.cartItems);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCartDetails();

  }, []);

  useEffect(() => {
    const fetchShippingDetails = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8080/api/cart/get-shipping-details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch shipping details");
        }
        const data = await response.json();
        setShippingData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching shipping details:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchShippingDetails();
  }, []);

  useEffect(() => {
    const calculateSubtotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
      setSubtotal(total);
      setTotal(total);
    };

    calculateSubtotal();
  }, [cartItems]);

  const navigate = useNavigate();

  const gotoHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="header-p">
        <img src={logo} alt="logo" onClick={gotoHome} className="logo-co" />
        <img src={books} alt="Book icon" className="books-co" />
      </div>
      <div className="payment-body">
        {/* Content Start*/}
        <div className="content">
          <div className="box1">
            {/* Contact */}
            <span className="one-line">
              <h6 className="short-font">Contact</h6>
              <h6 className="short-font">{shippingData.email}</h6>
              <Link to="/create-order" className="short-font change-link">
                Change
              </Link>
            </span>
            {/* Ship to */}
            <span className="one-line">
              <h6 className="short-font">Ship to</h6>
              <h6 className="medium-font" style={{ width: "350px" }} >
                {shippingData.address}, {shippingData.pincode}, {shippingData.city}, {shippingData.state}, India{" "}
              </h6>
              <Link to="/create-order" className="short-font change-link">
                Change
              </Link>
            </span>
          </div>
          <div className="box2">
            {cartItems.map((item)=>(
              <>
              <div key={item._id} className="one-line-box2">
              <img src={`http://localhost:8080/${item.book.image}`} alt={item.book.title} width="150px" height="150px" />
              <h6 className="medium-font">{item.book.title}</h6>
              <h6 className="medium-font ">₹{item.book.price}</h6>
            </div>
              </>
            ))}
            {/* Subtotal */}
            <div className="subtotal">
              <h6 className="one-line-box2">Subtotal</h6>
              <h6>₹ {subtotal}</h6>
            </div>
            {/* Total */}
            <div className="total">
              <h6 className="one-line-box2">Total</h6>
              <h6>₹ {total}</h6>
            </div>
          </div>
        </div>
        {/* Content End */}

        <div className="ship-and-payNow">
         <Link to='/create-order' style={{color:'black',textDecoration:'none'}}>
         <div className="to-shipping">
            <FontAwesomeIcon icon={faLessThan} size="1xs" />
            &nbsp;&nbsp;
            <h6 style={{fontSize:'12px'}}>Return to shipping</h6>
          </div>
         </Link>
          <button className="pay-now">Pay Now</button>
        </div>
      </div>
    </>
  );
};
