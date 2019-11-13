import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

/*  Show log in and sign up forms */

const AuthFormBlock = styled.div`
     h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
     }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus: {
        color: ${palette.gray[8]};
        border-bottom: 1px solid ${palette.gray[7]};
    }
    & + & {
        margin-top: 1rem;
    }
`;

/* Show Signup link in footer */
const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    a{
        color: ${palette.gray[6]};
        text-decoration: underline;
        &:hover {
            color: ${palette.gray[9]};
        }
}
`;

const textMap = {
    login: 'Log In',
    register: 'Sign up'
};

const AuthForm = ({ type }) => {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form>
                <StyledInput autoComplete="username" name="username" placeholder="Id" />
                <StyledInput
                    autoComplete="new-password" name="password" type="password" placeholder="Password"
                />
                {type === 'register' && (
                    <StyledInput
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="Password Confirm"
                        type="password"
                    />
                )}
                <Button cyan fullWidth style={{ marginTop: '1rem' }}>
                    {text}
                </Button>
            </form>
            <Footer>
                {type === 'login' ? (
                    <Link to="/register">Sign Up</Link>
                ) : (
                    <Link to="/login">Log In</Link>
                )}
            </Footer>
        </AuthFormBlock>
    )
};

export default AuthForm;