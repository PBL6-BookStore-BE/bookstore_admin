import React from 'react'
import main from '../assets/images/undraw_analytics_re_dkf8.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';
import BookLogo from '../components/common/BookLogo';
import { Heading, Highlight } from '@chakra-ui/react';

const Landing = () => {
    return (
    <Wrapper>
        <nav>
            <BookLogo />
        </nav>
        <div className="container page">
            <div className="info">
                <Heading textAlign='left'>
                    <Highlight query='manager' styles={{color: '#8D28AD'}}>
                        Book Store Manager Website
                    </Highlight>
                </Heading>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae accusamus quo, molestias tempora recusandae cum placeat tempore pariatur sed velit laboriosam voluptates ipsam vel debitis eveniet neque dolorem perspiciatis corporis.</p>
                <Link to='/login' className="btn btn-hero">login</Link>
            </div>
            <img src={main} alt="job hunt" className="img main-img" />
        </div>
    </Wrapper>
    );
};


export default Landing
