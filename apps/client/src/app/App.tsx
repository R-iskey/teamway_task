import { Route, Routes } from 'react-router-dom';
import AppLayout from './views/layouts/AppLayout';
import NotFound from './views/layouts/NotFound';
import QuizPage from './views/pages/quiz/QuizPage';
import QuestionPage from './views/pages/question/QuestionPage';

function App() {
  return <AppLayout>
    <Routes>
      <Route
        path='/'
        element={<QuizPage />}
      />
      <Route
        path='/manage'
        element={<QuestionPage />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </AppLayout>
}

export default App;
