import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper'

export const AuthSlice = createSlice({
    name: 'auth',

    initialState: {
     
       error:"",
       userInfo:{
            username:"",
            id:null,
    }
    },


    reducers: {

        setUser: (state, action) => {
            return {...state, userInfo: action.payload}
        },
        userLogin: (state,action) => {
            return { ...state, userInfo: action.payload };
        },
        userLogout: (state, action) => {
            return {
                ...state,
                userInfo: null,
              };
        },

    },

    extraReducers: {
        [HYDRATE]: (state,action) => {
            state.name = action.payload.profile.name
        }
    },
})



export const selectUser = (state) => state.userInfo
export const {userLogin, userLogout, setUser} = AuthSlice.actions;

export default AuthSlice.reducer;