import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));
    // input change event handler
    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    // form submit event handler
    const onSubmit = e => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        // if at least one of them is empty
        if([username, password, passwordConfirm].includes('')) {
            setError('Please fill out all fields.');
            return;
        }

        if (password !== passwordConfirm ){
            // [TODO] error handler:
            setError('Your password and confirmation password do not match.');
            changeField({ form: 'register', key: 'password', value: ''});
            changeField({ form: 'register', key: 'passwordConfirm', value: ''});
            return;
        }
        dispatch(register({ username, password }));
    };

    // initialize a form when it's first rendered.
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);


    // register success and failure handler
    useEffect(() => {
        if (authError) {
            // if the account is already existed
            if (authError.response.status === 409) {
                setError('Account already exists.');
            } else {
                setError('Signing up failed.');
            }
            return;
        }
        if (auth) {
            console.log('The new user has been successfully registered.');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // check if user setting works
    useEffect(() => {
        if(user) {
            history.push('/'); // go to homepage
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working.');
            }
        }
    }, [user, history]);

    return(
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);