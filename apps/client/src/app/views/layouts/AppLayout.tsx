import { Box, Container, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function AppLayout(props) {
  return <Box>
    <Flex bg={'blue.900'} py={5} px={10} columnGap={5} color={'white'}>
      <NavLink to={'/'}>Home</NavLink>
      <NavLink to={'/manage'}>Questions</NavLink>
    </Flex>
    <Container py={8} maxW={'container.xl'}>
      {props.children}
    </Container>
  </Box>;
}

export default AppLayout;
