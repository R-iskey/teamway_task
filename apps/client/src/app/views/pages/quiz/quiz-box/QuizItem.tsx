import { Box } from '@chakra-ui/react';
import React from 'react';
import { Option } from '../../../../api/question.api';

interface IProps {
  option: Option;
  selectedOption: string;

  onSelectOption(): void;
}

export default function QuizItem({ option, selectedOption, onSelectOption }: IProps) {
  return <Box
    key={option._id}
    py={2}
    px={4}
    bg={'white'}
    mb={2}
    onClick={onSelectOption}
    borderWidth={'2px'}
    borderColor={selectedOption === option._id ? 'purple.400' : 'gray.100'}
    borderRadius={'md'}
    _hover={{ cursor: 'pointer' }}
  >
    {option.text}
  </Box>;
}
