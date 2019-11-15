import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

/*
Declare new component by adding more styles in Responsive Component
 */
const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between; /* maximize the space between child elements*/
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right {
        display: flex;
        align-items: center;
    }
`;

/* Since header is positioanlly fixed,
spacer makes page content locate 4rem lower */
const Spacer = styled.div`
    height: 4rem;
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/" className="logo">
                        BLOG
                    </Link>
                    { user ? (
                        <div className="right">
                            <UserInfo>{user.username}</UserInfo>
                            <Button onClick={onLogout}>Log Out</Button>
                        </div>
                    ) : (
                        <div className="right">
                            <Button to="/login">Log In</Button>
                        </div>
                    )}
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;