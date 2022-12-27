import React from 'react'
import Wrapper from '../../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../store/cases/getAll/slice';
import { Button, Heading } from '@chakra-ui/react';
import { logout } from '../../store/cases/auth/slice';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSetting } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <Heading color='#8D28AD'>Dashboard</Heading>
        </div>
        <Menu>
          <MenuButton 
            as={Button} 
            leftIcon={<FaUserCircle />} color='#fff'
            rightIcon={<FaCaretDown />} bg='#8D28AD'
            _hover={{
              backgroundColor: '#761793'
            }}
            _active={{
              backgroundColor: '#761793'
            }}
          >
            {user}
          </MenuButton>
          <MenuList bg='#dbb4e8'>
            <MenuItem 
              bg='#dbb4e8'
              _hover={{
                color: '#761793',
                fontWeight: 700
                }}
              icon={<AiOutlineSetting />}
              onClick={() =>{
                navigate('/profile')
              }}
            >
              Edit Profile
            </MenuItem>
            <MenuItem
              bg='#dbb4e8'
              _hover={{
                color: '#761793',
                fontWeight: 700
                }}
              icon={<MdLogout />}
              onClick={() =>{
              dispatch(logout())
              navigate('/landing')}}
            >
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Wrapper>
  )
}

export default Navbar