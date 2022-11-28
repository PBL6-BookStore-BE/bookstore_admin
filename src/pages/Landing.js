import React from 'react'
import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components'
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className="container page">
            <div className="info">
                <h1>
                    job <span>tracking</span> app
                </h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae accusamus quo, molestias tempora recusandae cum placeat tempore pariatur sed velit laboriosam voluptates ipsam vel debitis eveniet neque dolorem perspiciatis corporis.</p>
                <Link to='/register' className="btn btn-hero">login/register</Link>
            </div>
            <img src={main} alt="job hunt" className="img main-img" />
        </div>
    </Wrapper>
    );
};


export default Landing
