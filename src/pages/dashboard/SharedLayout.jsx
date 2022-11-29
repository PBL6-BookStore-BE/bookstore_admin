import React from 'react'
import { Outlet } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout'
import BigSidebar from '../../components/BigSidebar/BigSidebar';
import Navbar1 from '../../components/Navbar1/Navbar1';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        {/* <SmallSidebar /> */}
        <BigSidebar />
        <div>
          <Navbar1 />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout