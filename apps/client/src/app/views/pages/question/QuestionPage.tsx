import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Card from '../../components/card/Card';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

export default function QuestionPage() {
  return <Box>
    <Heading size={'lg'} mb={5}>Manage Questions</Heading>
    <SimpleGrid columns={2} spacing={10}>
      <Card>
        <QuestionForm />
      </Card>
      <Box>
        <QuestionList />
      </Box>
    </SimpleGrid>
  </Box>;
}
