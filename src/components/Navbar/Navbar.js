import React, { useContext } from 'react';
import { Navbar, Container, Image } from 'react-bootstrap';

import './NavBar.css';
import Context from '../../context/context.js';
import logo from '../../assets/SpaceX-Logo.svg';


const NavBar = () => {
  const { handleClick } = useContext(Context);
  const handleRefresh = () => window.location.reload();

  return (
    <Navbar expand='lg'>
      <Container className="links-container">
        <button onClick={handleRefresh}>
          <Image
            src={logo}
            className='d-inline-block align-top'
            alt=''
            loading='lazy'
          />
        </button>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <button className='nav-link' onClick={handleClick}>ROCKETS</button>
          </li>
          <li className='nav-item'>
            <button className='nav-link' onClick={handleClick}>DRAGONS</button>
          </li>
        </ul>
      </Container>
    </Navbar>
  )
};

export default NavBar;
