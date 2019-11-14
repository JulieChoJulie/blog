// login
import client from "./client";

export const login = ({ username, password }) =>
    client.post('/api/auth/login', { username, password });

// register
export const register = ({ username, password }) =>
    client.post('/api/auth/register', {username, password});

// login status check
export const check = () => client.get('/api/auth/check');

