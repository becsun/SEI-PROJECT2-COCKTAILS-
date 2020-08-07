import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = ( ) => (
  <nav> 
    <div className ="navbarstyle">
      <Link to="/" className = "navbar-item">HOME</Link  >
      <Link to="/cocktail" className = "navbar-item">QUICK PICK</Link  >
    </div>
  </nav>
) 
export default NavBar