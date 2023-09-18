import React from 'react';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <div>
            <h3>returning user</h3>
            <LoginForm />
            <h3>new user</h3>
            <SignupForm />
        </div>
    )
};

export default Login;