import { useState } from "react";
import { useRegisterMutation, useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";
export default function Register(){
    const [login]=useLoginMutation();
    const[username, setUsername]= useState('');
    const [password, setPassword] =useState('');
    const [register, {isLoading, error}]=useRegisterMutation();
    const dispatch= useAppDispatch();
    const handleSubmit =async(e: React.FormEvent)=>{
        e.preventDefault();
        try{
            await register({username, password}).unwrap();
            const loginResult= await login ({username, password}).unwrap();
            dispatch(setCredentials({token:loginResult.token, username}));
        }
        catch (err){
            console.error('Registration failed:', err);
        }
    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
      <input className="text-red-500"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className="text-red-500"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={{ color: 'red' }}>Registration failed</p>}
        </form>
    )
}