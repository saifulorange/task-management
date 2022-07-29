import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    taskList : null,
    taskDetail : null,
    memberList : null,
    memberDetail : null
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskDetail: (state,action) =>{
        state.taskDetail = action.payload.data
    },

    setTaskAll : (state,action) =>{
        state.taskList = action.payload.data
    },
  }
});

export const {setTaskDetail, setTaskAll} = taskSlice.actions

export const taskInfo = (state) => state.task;

export default taskSlice.reducer