import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import DeleteDialog from '../../components/delete-dialog/DeleteDialog';
import { useAppDispatch } from '../../../hooks/useRedux';
import { setEditableQuestion } from '../../../store/commonSlice';
import { useDeleteQuestionMutation, useListQuestionsQuery } from '../../../api/question.api';
import Skeleton from '../../components/skeleton/Skeleton';

export default function QuestionList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: questions = [], isLoading } = useListQuestionsQuery();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const dispatch = useAppDispatch();

  const [removeQuestion, setRemoveQuestion] = useState(null);

  const handleModalClose = (processRemove: boolean) => {
    if (processRemove) {
      deleteQuestion(removeQuestion._id);
    }
    setRemoveQuestion(null);
    onClose();
  };

  const handleModalOpen = (question) => {
    setRemoveQuestion(question);
    onOpen();
  };

  const handleClickOnEdit = (question) => {
    dispatch(setEditableQuestion(question));
  };

  if (isLoading) {
    return <Skeleton />;
  }
  return <>
    <Accordion allowToggle>
      {
        questions.map(q => (
          <AccordionItem key={q._id} borderWidth={'1px'} borderRadius={'md'} mb={2}>
            <h2>
              <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }} borderRadius={'md'}>
                <Box as='span' flex='1' textAlign='left'>
                  {q.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {q.options.map(option => (
                <Text key={option._id}>&#x2022; {option.text}</Text>
              ))}
              <Box borderTopWidth={'1px'} mt={5} pt={3}>
                <ButtonGroup gap='2'>
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme='gray'
                    onClick={() => handleClickOnEdit(q)}
                    size={'sm'}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme='red'
                    size={'sm'}
                    variant='outline'
                    onClick={() => handleModalOpen(q)}
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))
      }
    </Accordion>
    <DeleteDialog
      title={'Delete Question'}
      body={`Are you sure? You can't undo this action afterwards.`}
      isOpen={isOpen}
      onClose={handleModalClose}
    />
  </>;
}
