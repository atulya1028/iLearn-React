import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './images/iLearn.jpg'

export default function Header() {
  return (
    <>
    <header className="head">
        <img src={logo} width="100px" height="80px" alt="iLearn"/>
        <ul className="tab">
            <li><Link to="/">Home</Link></li>
            <li> <Link to="about-us">About Us</Link></li>
            <li><Link to="contact">Contact Us</Link></li>
            <li><Link to="business">Business</Link></li>
        </ul>
    </header>
    </>
  )
}
