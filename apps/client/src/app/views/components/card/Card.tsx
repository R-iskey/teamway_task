import { Box } from '@chakra-ui/react';
import { BoxProps } from '@chakra-ui/layout/dist/box';

interface IProps extends BoxProps {

}
export default function Card(props: IProps) {
  return <Box
    border='1px'
    borderColor='gray.200'
    borderRadius={'md'}
    bg={'gray.50'}
    px={5}
    py={3}
    mb={8}
    {...props}
  >
    {props.children}
  </Box>
}
