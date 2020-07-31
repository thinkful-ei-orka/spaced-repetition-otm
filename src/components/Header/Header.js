
import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const [show, setShow] = useState(false); //hook for conditionally controlling the navbar links depending on screen sizes.

  const context = useContext(UserContext)

  function handleLogoutClick() {
    context.processLogout()
  }

  const nav_class = `nav-links ${!show ? "hideMenu" : ""}`;


  function renderLogoutLink() {
    return (
      <header>
        <nav className={nav_class}>
          <Link
            className="navlink"
            onClick={handleLogoutClick}
            to='/login'>
            Logout
            </Link>
        </nav>
        <Link
            className="navlink user-name"
            to="#">
            {context.user.name}
          </Link>
        <div className="icon">
          {!show ? <GiHamburgerMenu onClick={(e) => setShow(!show)} /> : <div onClick={(e) => setShow(!show)}>X</div>}
        </div>
      </header>
    )
  }

  function renderLoginLink() {
    return (

      <nav>
        <div className={nav_class}>
          <Link className="navlink" to='/login'>Login</Link>
          {' '}
          <Link className="navlink" to='/register'>Sign up</Link>
        </div>
        <div className="icon">
          {!show ? <GiHamburgerMenu onClick={(e) => setShow(!show)} /> : <div onClick={(e) => setShow(!show)}>X</div>}
        </div>
      </nav>

    )
  }

  return (
    <header className="header">
      <h3>
        <Link className="h1" to='/'>
          Spaced Repetition
            </Link>
      </h3>
      {TokenService.hasAuthToken()
        ? renderLogoutLink()
        : renderLoginLink()}
    </header>
  );
}

export default Header
