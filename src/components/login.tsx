import {useState} from 'react';
import {useLoginMutation } from "../features/auth/authApiSlice";
import {useAppDispatch} from '../app/hooks';
import {setCredentials} from '../features/auth/authSlice';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
      const result= await login ({username, password}).unwrap();
      dispatch(setCredentials({token: result.token ,username}));
        } catch (err) {
            console.error('Failed to login:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className="text-black"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className="text-black"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={{color:'red'}}> Invalid username or password</p>}
        </form>
    );
}
