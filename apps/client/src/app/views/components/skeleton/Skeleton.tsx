import { Stack, Skeleton as CSkeleton } from '@chakra-ui/react';

export default function Skeleton() {
  return <Stack>
    <CSkeleton height='40px' />
    <CSkeleton height='40px' />
    <CSkeleton height='40px' />
    <CSkeleton height='40px' />
    <CSkeleton height='40px' />
    <CSkeleton height='40px' />
  </Stack>
}
