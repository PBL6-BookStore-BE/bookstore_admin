import React from 'react'
import Wrapper from '../../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import BookLogo from '../common/BookLogo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/cases/getAll/slice';
import { Heading } from '@chakra-ui/react';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
//   const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSidebar());
  }

  return (
    <Wrapper>
      <div className="nav-center">
        <button type='button' className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          {/* <BookLogo /> */}
          <Heading>Dashboard</Heading>
        </div>
        <div className="btn-container">
          <button className="btn" type="button" onClick={() =>setShowLogout(!showLogout)}>
            <FaUserCircle />
            {/* {user?.name} */}
            hkngoc
            <FaCaretDown />
          </button>
          {/* "dropdown show-dropdown" */}
          <div className={showLogout? 'dropdown show-dropdown' : 'dropdown'}>
            <button className="dropdown-btn" type='button' onClick={() =>console.log('loggout')}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar