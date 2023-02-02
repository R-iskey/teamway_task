import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import React from 'react';

interface IProps {
  isOpen: boolean;

  cancelRef?: React.RefObject<any>;

  onClose(confirmed?: boolean): void;

  title: string;

  body: string;
}

export default function DeleteDialog(props: IProps) {
  const { title, body, isOpen, cancelRef = React.useRef(), onClose } = props;
  return <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={() => onClose()}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          {title}
        </AlertDialogHeader>

        <AlertDialogBody>
          {body}
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => onClose()}>
            Cancel
          </Button>
          <Button colorScheme='red' onClick={() => onClose(true)} ml={3}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>;
}
