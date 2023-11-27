import React from 'react'
import icon from './favicon.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const linkStyle = {
    textDecoration: 'none',
    margin: '0 10px', // Spacing between links
    fontSize: '1rem', // Larger font size
  }

  return (
    <nav className="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
      <div className="container-fluid px-5">
        <Link to="/" className="navbar-brand">
          <img
            src={icon}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          CryptoClan
        </Link>
        <div id="navbarNav" className="d-flex collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                style={linkStyle}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/mint"
                className="nav-link"
                style={linkStyle}
              >
                NFT Mint
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/marketplace"
                className="nav-link"
                style={linkStyle}
              >
                Marketplace
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/my-tokens"
                className="nav-link"
                style={linkStyle}
              >
                Tokens
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/queries"
                className="nav-link"
                style={linkStyle}
              >
                Queries
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/account"
                className="nav-link"
                style={linkStyle}
              >
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
