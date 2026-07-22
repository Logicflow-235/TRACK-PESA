import { createSlice } from "@reduxjs/toolkit";
const authSlice= createSlice({
name : 'auth',
initialState: {
    token:null as string |null,
    username: null as string |null,
}, reducers:{
    setCredentials:(state, action)=>{
         state.token =action.payload.token;
         state.username=  action.payload.username;
    },
    logout:(state)=>{
        state.token =null;
        state.username=null;
    }     
}
})
export const {setCredentials, logout} =authSlice.actions;
export default authSlice.reducer;