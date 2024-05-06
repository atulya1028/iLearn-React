import React from "react";
import "../styles/CreateOrder.css";
import logo from '../images/iLearn.png';
import books from '../images/books.gif';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const CreateOrder = () => {
    return (
        <>
            <div className="header">
                <Link to='/'><img src={logo} alt="logo" height={250} /></Link>
                <img src={books} alt="Book icon" height={250} />
            </div>
            {/* Header */}
            <div className="flex-box">
                {/* Shipping details */}
                <div className="shipping-details">
                    <h3>Shipping address</h3>
                    <div className="country-box">
                        <label htmlFor="country">Country/Region</label>
                        <br />
                        <select name="country" id="country" className="country-choice">
                            <option value="India">India</option>
                        </select>
                    </div>
                    <br />
                    <span className="intro">
                        <input type="text" placeholder="First name" />
                        <input type="text" placeholder="Last name" />
                    </span>
                    <br />
                    <input type="text" placeholder="Address" className="address" />
                    <br /><br />
                    <input type="text" placeholder="Apartment, suites,etc. (optional)" className="apartment" />
                    <br /><br />
                    <span className="loc">
                        <input type="text" placeholder="City" className="city" />
                        <div className="state-box">
                            <label htmlFor="state">State</label>
                            <select name="state" id="state" className="state-choice">
                                <option value="Andaman and Nicobar">Andaman and Nicobar</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Rajasthan">Rajasthan</option>
                            </select>
                        </div>
                        <input type="number" name="pincode" id="pincode" 
                        placeholder="PIN code" className="pincode" />
                    </span>
                    <br /><br />
                    <input type="number" name="" id="" className="phone" placeholder="Phone" />
                    <br /><br />
                    <span className="check-box">
                        <input type="checkbox" className="save" />
                        &nbsp;
                        <h6 className="save-info">Save this information for next time</h6>
                    </span>
                    <span className="to-cart">
                        <Link to='/cart' className="cart-btn">
                            <FontAwesomeIcon icon={faLessThan} color="black" />
                            &nbsp; &nbsp;
                            <h6 style={{ fontSize: '12px' }}> Return to cart</h6>
                        </Link>
                        <button className="shipping-btn">Continue to shipping</button>
                    </span>
                </div>
                {/* Items details */}
                <div className="item-details">
                    <span className="book-box">
                        <img src="" alt="" width={100} height={100} />
                        <h5 className="text">Steve Jobs</h5>
                        <h5 className="text">₹ 500</h5>
                    </span>
                    <br />
                    <div className="subtotal">
                        <h6>Subtotal</h6>
                        <h6>₹ 500</h6>
                    </div>
                    <br />
                    <div className="ship">
                        <h6>Shipping</h6>
                        <h6>Calculated at next step</h6>
                    </div>
                    <br />
                    <div className="total">
                        <h3 >Total</h3>
                        <span className="price">
                             <h6 className="inr">INR</h6>
                             &nbsp;
                         <h3>₹ 500</h3></span>
                    </div>
                </div>

            </div>
        </>
    );
};
