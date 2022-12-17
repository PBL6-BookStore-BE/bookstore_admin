import React from 'react'
import { useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/BigSidebar';
import NavLinks from '../NavLinks/NavLinks';
import BookLogo from '../common/BookLogo'

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.getAll);

  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <BookLogo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar