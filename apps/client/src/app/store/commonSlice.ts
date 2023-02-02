import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collectedAnswers: {},
  editableQuestion: null,
  currentQuestionIndex: 0,
  quizCompleted: false
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setEditableQuestion(state, action) {
      state.editableQuestion = action.payload;
    },
    chooseOption(state, action) {
      const { question, option } = action.payload;
      state.collectedAnswers[question] = option;
    },
    navigateQuestion(state, action) {
      state.currentQuestionIndex += action.payload;
    },
    setQuizCompleted(state, action) {
      state.quizCompleted = action.payload;
    },
    resetQuiz() {
      return initialState;
    }
  }
});

export const {
  resetQuiz,
  setQuizCompleted,
  navigateQuestion,
  chooseOption,
  setEditableQuestion
} = commonSlice.actions;

export default commonSlice.reducer;
