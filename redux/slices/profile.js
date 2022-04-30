import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper'

export const ProfileSlice = createSlice({
    name: 'profile',

    initialState: {
        name: null
    },
    reducers: {
        setProfileData: (state,action) => {
            state.name = action.payload;
        }

    },

    extraReducers: {
        [HYDRATE]: (state,action) => {
            state.name = action.payload.profile.name
        }
    }
})


export const {setProfileData} = ProfileSlice.actions;

export default ProfileSlice.reducer;