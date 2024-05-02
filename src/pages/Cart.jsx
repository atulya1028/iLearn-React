import React, { useState, useEffect } from "react";
import "../styles/Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import emptyBox from '../images/empty-box.png';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/api/cart/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();
        setCart(data.cartItems);
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    getCartItems();
  }, []);

  const handleQuantityChange = async (event,itemId, newQuantity) => {
    try {
      event.preventDefault();

      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/cart/update/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedCart = await response.json();
      setCart(updatedCart.cartItems);
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
    window.location.reload();
  };

  return (
    <>
      <h4 className="heading">My Bag</h4>
      <div className="cart">
        {cart &&
          cart.map((item) => (
            <div className="details" key={item._id}>
              <div className="items">
                <img src={`http://localhost:8080/${item.book.image}`} alt={item.book.title} width={100} height={150} />
                <span className="title-top">
                  <h6>{item.book.title}</h6>
                  <h6>₹ {item.price}</h6>
                  <select
                    name="quantity"
                    id="quantity"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e,item._id, parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <h6>₹ {item.price * item.quantity}</h6>
                    <FontAwesomeIcon icon={faTrash} size="1x" />
                  </span>
                </span>
              </div>
            </div>
          ))}
        {!cart && <img src={emptyBox} className="empty-box" alt="Empty Cart" />}
      </div>
    </>
  );
};

export default Cart;
