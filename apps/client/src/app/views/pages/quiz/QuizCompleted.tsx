import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useAppDispatch } from '../../../hooks/useRedux';
import { resetQuiz } from '../../../store/commonSlice';

export default function QuizCompleted() {
  const dispatch = useAppDispatch();

  return <Box>
    <Heading fontSize={'md'} py={3}>Congratulation! You're successfully passed the test</Heading>
    <Flex mt={8} justifyContent={'center'}>
      <Button
        size={'md'}
        colorScheme={'purple'}
        onClick={() => dispatch(resetQuiz())}
      >
        Start again
      </Button>
    </Flex>
  </Box>;
}
