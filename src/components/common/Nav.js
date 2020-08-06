import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = ( ) => (
  <nav className="navbar is-dark"> 
    <div className ="container"></div>
    <div className ="navbar-brand">
      <Link to="/" className = "navbar-item">Home</Link  >
      <Link to="/cocktail" className = "navbar-item">Quick Pick</Link  >
    </div>
  </nav>
) 
export default NavBar