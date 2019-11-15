import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
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
        if (password !== passwordConfirm ){
            // [TODO] error handler:
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
            console.log('Error has been occured.');
            console.log(authError);
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
        }
    }, [user, history]);

    return(
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default withRouter(RegisterForm);