import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isLogedIn: false,
        loading: false,
        comments:[],
        blogs:[],
        likes:[]
    },

    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
            state.isLogedIn = true
        },
        setLogout:(state)=>{
            state.user = null;
            state.isLogedIn = false;
        },
        setBlogs:(state,action)=>{
            state.blogs = action.payload;
        }

    }
});

export const {setUser,setLogout,setBlogs} = UserSlice.actions;
export default UserSlice.reducer;