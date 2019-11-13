import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

/* Sign up/signin page layout */

/* Fill the whole screen */
const AuthTemplateBlock = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${palette.gray[2]};
    /* arrange to center */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

/* Whitebox */
const WhiteBox = styled.div`
    .logo-area {
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    padding: 2rem;
    width: 360px;
    background: whtie;
    border-radius: 2px;
`;


const AuthTemplate = ({ children }) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    <Link to="/">Blog</Link>
                </div>
            {children}
            </WhiteBox>
        </AuthTemplateBlock>
    )
};

export default AuthTemplate;