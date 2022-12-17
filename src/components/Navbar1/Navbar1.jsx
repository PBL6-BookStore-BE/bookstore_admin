import React from 'react'
import Wrapper from '../../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import BookLogo from '../common/BookLogo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/cases/getAll/slice';
import { Heading, Link } from '@chakra-ui/react';
import { logout } from '../../store/cases/auth/slice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, isLogged } = useSelector((store) => store.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => {
    dispatch(toggleSidebar());
  }

  return (
    // <Wrapper style={{ zIndex: "10" }}>
    <Wrapper>
      <div className="nav-center">
        <button type='button' className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          {/* <BookLogo /> */}
          <Heading color='#8D28AD'>Dashboard</Heading>
        </div>
        <div className="btn-container">
          <button className="btn" type="button" onClick={() =>setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user}
            <FaCaretDown />
          </button>
          <div className={showLogout? 'dropdown show-dropdown' : 'dropdown'}>
            <button className="dropdown-btn" type='button' onClick={() =>{
              dispatch(logout())
              navigate('/landing')}}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar