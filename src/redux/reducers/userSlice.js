import { createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : 'userSlice',
    initialState : null,
    reducers:{
        getUser: (state, action)=>{
            state = action.payload;
        }
    }
})

export default userSlice