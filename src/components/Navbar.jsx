import React from 'react'
import './nav.css'
const Navbar = () => {
  return (
    <nav>
            <div className="logo">TaskManager</div>
            <div className="navitems">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                </ul>
            </div>
        
    </nav>
  )
}

export default Navbar