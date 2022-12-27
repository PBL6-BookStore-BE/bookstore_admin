import React from 'react'
import { Outlet } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout'
import BigSidebar from '../../components/BigSidebar/BigSidebar';
import SmallSidebar from '../../components/SmallSidebar/SmallSidebar';
import Navbar1 from '../../components/Navbar1/Navbar1';
import { Helmet } from 'react-helmet';

const SharedLayout = () => {
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin - Book store</title>
      </Helmet>
      <main className="dashboard">
        <SmallSidebar />
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