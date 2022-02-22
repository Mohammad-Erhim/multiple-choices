import {  createSlice } from "@reduxjs/toolkit";
 
 
const initialState:{questionNumber:number} = {
  questionNumber:0
};

 const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    incQuestionNumber(state) {
      state.questionNumber = ++state.questionNumber;
    },
   resetQuestionNumber(state) {
      state.questionNumber = 0;
    },

    
  },
});
 
export default appSlice;