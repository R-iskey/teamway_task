import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import Card from '../../components/card/Card';
import { useListQuestionsQuery } from '../../../api/question.api';
import React, { useState } from 'react';
import { navigateQuestion } from '../../../store/commonSlice';
import QuizCompleted from './QuizCompleted';
import QuizBox from './quiz-box/QuizBox';

export default function QuizPage() {
  const dispatch = useAppDispatch();
  const [isProgress, setIsProgress] = useState(false);

  const { quizCompleted } = useAppSelector(state => state.common);

  const { data: questions = [], isLoading } = useListQuestionsQuery();

  const handleStart = () => {
    setIsProgress(true);
    dispatch(navigateQuestion(0));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return <Card w={'md'} m={'auto'}>
    {
      !isProgress ?
        <Box>
          <Box mb={5}>
            <Text fontSize={'xl'}>Are you an introvert or an extrovert?</Text>
            <Text color={'gray.500'} fontSize={'md'} as={'em'}>(click button below to start)</Text>
          </Box>
          <Button
            size={'md'}
            loadingText='Loading'
            borderRadius={'md'}
            colorScheme={'purple'}
            onClick={handleStart}
            isDisabled={!questions.length}
          >
            Start Test
          </Button>
        </Box>
        : quizCompleted ? <QuizCompleted /> : <QuizBox />
    }
  </Card>;
}
