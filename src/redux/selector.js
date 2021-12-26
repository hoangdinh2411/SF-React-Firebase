import { createSelector } from '@reduxjs/toolkit'

const userSlice = state=>  state.user


export const userSelector = createSelector(userSlice,(user)=>{
    return user
})