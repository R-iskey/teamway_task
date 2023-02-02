import { FormControl, FormLabel, Stack, Textarea, TextareaProps } from '@chakra-ui/react';
import React from 'react';

interface IProps extends TextareaProps {
  label: string;

  isRequired?: boolean;

  variant?: 'vertical' | 'horizontal';
}

export default function FormInput({ label, isRequired = false, variant = 'horizontal', ...restProps }: IProps) {
  return <FormControl isRequired={isRequired} mb={2}>
    <Stack direction={variant === 'horizontal' ? 'row' : 'column'}>
      <FormLabel w={120}>{label}</FormLabel>
      <Textarea {...restProps} rows={1} />
    </Stack>
  </FormControl>;
}
