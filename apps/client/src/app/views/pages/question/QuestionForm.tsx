import FormInput from '../../components/form-input/FormInput';
import { Button, FormControl, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Question, useAddQuestionMutation, useEditQuestionMutation } from '../../../api/question.api';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setEditableQuestion } from '../../../store/commonSlice';
import useApiError from '../../../hooks/useApiError';

export default function QuestionForm() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { editableQuestion } = useAppSelector(state => state.common);

  const [editQuestion, {
    data: updatedQuestion,
    isLoading: updateLoading,
    error: updateError
  }] = useEditQuestionMutation();

  const [createQuestion, {
    data: newQuestion,
    isLoading: addLoading,
    error: createError
  }] = useAddQuestionMutation();

  const errorMessage = useApiError(updateError || createError);

  const formik = useFormik({
    initialValues: {
      _id: '',
      question: '',
      options: [
        { _id: '', text: '' },
        { _id: '', text: '' },
        { _id: '', text: '' },
        { _id: '', text: '' }
      ]
    },
    onSubmit: (values) => {
      const { _id, ...fields } = values;
      if (_id) {
        return editQuestion(values);
      }
      return createQuestion({
        ...fields,
        options: fields.options.map(opt => ({ text: opt.text }))
      });
    }
  });

  useEffect(() => {
    if (updatedQuestion) {
      dispatch(setEditableQuestion(null));
    }
    if (newQuestion || updatedQuestion) {
      toast({
        title: `Successfully ${newQuestion ? 'Created' : 'Updated'}`,
        status: 'success',
        isClosable: true
      });
      formik.resetForm();
    }
  }, [newQuestion, updatedQuestion]);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: `Something went wrong`,
        description: errorMessage,
        status: 'error',
        isClosable: true
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (editableQuestion) {
      formik.setFieldValue('_id', editableQuestion._id);
      formik.setFieldValue('question', editableQuestion.question);
      formik.setFieldValue('options', editableQuestion.options);
    }
  }, [editableQuestion]);

  return <form onSubmit={formik.handleSubmit}>
    <FormInput
      isRequired
      label={'Question'}
      name={'question'}
      placeholder='Type the question'
      onChange={formik.handleChange}
      value={formik.values.question}
    />
    {
      formik.values.options.map((option, i) => (
        <FormInput
          key={option._id || i}
          isRequired
          label={`Option #${i + 1}`}
          name={`options[${i}].text`}
          placeholder='Type the option'
          onChange={formik.handleChange}
          value={formik.values.options[i].text}
        />
      ))
    }
    <FormControl mb={2} mt={5}>
      <Button
        isLoading={addLoading || updateLoading}
        loadingText={'Saving...'}
        colorScheme={'purple'}
        type={'submit'}
      >
        Save
      </Button>
    </FormControl>
  </form>;
}
