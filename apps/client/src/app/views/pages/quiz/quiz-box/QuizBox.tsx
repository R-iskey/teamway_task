import { Box, Button, ButtonGroup, Heading, Text } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { chooseOption, navigateQuestion, setQuizCompleted } from '../../../../store/commonSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux';
import { useListQuestionsQuery } from '../../../../api/question.api';
import QuizItem from './QuizItem';

export default function QuizBox() {
  const dispatch = useAppDispatch();
  const { data: questions = [] } = useListQuestionsQuery();

  const { collectedAnswers, currentQuestionIndex } = useAppSelector(state => state.common);

  const [selectedOptionId, setSelectedOptionId] = useState('');

  const isLastQuestion = questions.length === currentQuestionIndex + 1;

  const curQuestion = questions[currentQuestionIndex];
  const curAnswer = collectedAnswers[curQuestion?._id];

  useEffect(() => {
    if (curAnswer) {
      setSelectedOptionId(curAnswer);
    }
  }, [curAnswer]);

  const handleNavigate = (step) => {
    if (step > 0) {
      dispatch(
        chooseOption({
          question: curQuestion._id,
          option: selectedOptionId
        })
      );
    }
    setSelectedOptionId('');
    dispatch(
      isLastQuestion ? setQuizCompleted(true) : navigateQuestion(step)
    );
  };

  const handleSelectOption = (id: string) => {
    setSelectedOptionId(id);
  };

  return <Box>
    <Text fontSize='md' color={'gray.600'}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
    <Heading fontSize={'md'} py={3}>{curQuestion.question}</Heading>
    <Text fontSize='xs' as={'em'} color={'gray.400'}>All questions are required</Text>
    <Box mt={5}>
      {
        curQuestion.options.map(opt => (
          <QuizItem
            key={opt._id}
            option={opt}
            selectedOption={selectedOptionId}
            onSelectOption={() => handleSelectOption(opt._id)}
          />
        ))
      }
      <Box mt={8}>
        <ButtonGroup display={'flex'} justifyContent={'space-between'} alignItems={'space-between'}>
          {currentQuestionIndex !== 0 &&
            <Button
              size={'md'}
              leftIcon={<ArrowLeftIcon boxSize={2} />}
              onClick={() => handleNavigate(-1)}
            >
              Previous
            </Button>
          }
          <Button
            size={'md'}
            colorScheme={isLastQuestion ? 'red' : 'purple'}
            rightIcon={<ArrowRightIcon boxSize={2} />}
            onClick={() => handleNavigate(1)}
            isDisabled={!selectedOptionId}
          >
            {isLastQuestion ? 'Finish test' : 'Next question'}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  </Box>;
}
