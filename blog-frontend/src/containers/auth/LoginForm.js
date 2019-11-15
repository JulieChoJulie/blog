import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));
    // input change event handler
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    // form submit event handler
    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    };

    // initialize a form when it's first rendered.
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if(authError) {
            console.log('Authorization error has been occured.');
            console.log(authError);
            setError('Login Failed');
            return;
        }
        if(auth) {
            console.log('You have successfully logged in.');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [user, history]);

    return(
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);